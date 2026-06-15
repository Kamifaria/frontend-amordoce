/**
 * BFS flood-fill from all 4 edges to remove "checkerboard" or plain white backgrounds.
 * Detects both:
 *  - Pure white/near-white opaque pixels (rgba ~255,255,255,255)
 *  - Checkered gray pixels that alternate with white (rgba ~204,204,204,255)
 * Only pixels reachable from the image border are made transparent.
 * CORS: The server returns Access-Control-Allow-Origin: * so crossOrigin='anonymous' works.
 */
export function removeBackground(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Required to avoid tainted canvas with CORS headers present
    img.src = imageUrl;

    img.onload = () => {
      try {
        const MAX_DIM = 1024; // process at max 1024px for speed
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const W = Math.round(img.width * scale);
        const H = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) { resolve(imageUrl); return; }

        ctx.drawImage(img, 0, 0, W, H);

        let imgData: ImageData;
        try {
          imgData = ctx.getImageData(0, 0, W, H);
        } catch (corsErr) {
          console.warn('[imageProcessing] Canvas getImageData failed (CORS?). Using raw URL.', corsErr);
          resolve(imageUrl);
          return;
        }

        const data = imgData.data;
        const TOL = 35; // tolerance for near-white and checkerboard gray

        /**
         * Returns true if the pixel at byte offset `i` looks like background:
         * - Neon Green screen (for AI generated CGs)
         * - Near-white: all channels >= 255-TOL  
         * - Near-gray (checkerboard)
         * - Already fully transparent
         */
        const isBackground = (i: number): boolean => {
          const a = data[i + 3];
          if (a < 10) return true; // already transparent
          const r = data[i], g = data[i + 1], b = data[i + 2];
          
          // Green Screen (Neon green)
          if (g > 180 && r < 100 && b < 100) return true;

          const TOL = 15; // Tighter tolerance to protect white clothes
          // White / near-white
          if (r >= 255 - TOL && g >= 255 - TOL && b >= 255 - TOL) return true;
          // Checkerboard gray
          const avg = (r + g + b) / 3;
          const saturation = Math.max(Math.abs(r - avg), Math.abs(g - avg), Math.abs(b - avg));
          if (avg >= 180 && saturation < 15) return true; // low-saturation gray
          return false;
        };

        const visited = new Uint8Array(W * H);
        const queue: number[] = [];

        const seed = (x: number, y: number) => {
          const idx = y * W + x;
          if (visited[idx]) return;
          visited[idx] = 1;
          if (isBackground(idx * 4)) queue.push(idx);
        };

        // Seed from all 4 edges
        for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
        for (let y = 1; y < H - 1; y++) { seed(0, y); seed(W - 1, y); }

        const DX = [1, -1, 0, 0];
        const DY = [0, 0, 1, -1];

        while (queue.length > 0) {
          const cur = queue.pop()!;
          data[cur * 4 + 3] = 0; // make transparent
          const cx = cur % W;
          const cy = (cur / W) | 0;
          for (let d = 0; d < 4; d++) {
            const nx = cx + DX[d], ny = cy + DY[d];
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const ni = ny * W + nx;
            if (!visited[ni]) {
              visited[ni] = 1;
              if (isBackground(ni * 4)) queue.push(ni);
            }
          }
        }

        // --- Edge erosion (Defringing) ---
        // Removes the white/gray halo left by anti-aliased edges blending with the background
        for (let pass = 0; pass < 2; pass++) {
          const toErode: number[] = [];
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              const i = y * W + x;
              const alphaIdx = i * 4 + 3;
              if (data[alphaIdx] === 0) continue; // Already transparent

              let hasTransparentNeighbor = false;
              for (let d = 0; d < 4; d++) {
                const nx = x + DX[d], ny = y + DY[d];
                if (nx >= 0 && ny >= 0 && nx < W && ny < H) {
                  if (data[(ny * W + nx) * 4 + 3] === 0) {
                    hasTransparentNeighbor = true;
                    break;
                  }
                }
              }

              if (hasTransparentNeighbor) {
                const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
                const brightness = (r + g + b) / 3;
                
                if (pass === 0) {
                  // Pass 1: Unconditionally erode 1 pixel. The immediate boundary is always a blended mix.
                  toErode.push(i);
                } else {
                  // Pass 2: Erode a second pixel only if it's bright (white halo). 
                  // If it's dark (character outline), just soften it slightly.
                  if (brightness > 130) {
                    toErode.push(i);
                  } else {
                    data[alphaIdx] = Math.max(0, data[alphaIdx] - 100); // soften edge
                  }
                }
              }
            }
          }
          // Apply erosion
          for (const i of toErode) {
            data[i * 4 + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('[imageProcessing] Background removal error:', err);
        resolve(imageUrl);
      }
    };

    img.onerror = (e) => {
      console.warn('[imageProcessing] Image load error:', e);
      resolve(imageUrl);
    };
  });
}
