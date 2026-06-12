# Research: Dialogue and CG Image Backgrounds Fix

## Decision: PNG Asset Swapping and Dynamic Background Overlay

### Findings:
1. **Asset Signatures**:
   - `public/images/cgs/fight.png` is actually a **JPEG** file disguised with a `.png` extension. Because JPEG does not support alpha channel transparency, the gray-and-white checkerboard grid is baked directly into the image pixels.
   - `public/images/sprites/briga_castiele_natahiel.png` is a **true PNG** file with color type 6 (Truecolor with alpha channel transparency) and is 7.17 MB.
2. **Background Overlay**:
   - Currently, `CGOverlay.tsx` displays the CG image on a solid dark purple background (`bg-[#120e24]`).
   - If we use a transparent PNG, we can dynamically load the active story background (e.g. the corridor `/images/backgrounds/corridor.png`) behind the image container using CSS backgrounds.

### Action Plan:
- Backup the original fake-PNG `public/images/cgs/fight.png`.
- Copy the true transparent `public/images/sprites/briga_castiele_natahiel.png` to `public/images/cgs/fight.png` (or map it in `storyData.ts`).
- Update `CGOverlay.tsx` to retrieve the current scene background from the Zustand game store and apply it as the container background behind the transparent CG image.
- Adjust dialogue character sprite sizing and boundaries to ensure they fit correctly without overflow or layout shifts.
