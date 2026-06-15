/* eslint-disable @typescript-eslint/no-require-imports */
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'public/images/cgs'),
  path.join(__dirname, 'public/images/sprites')
];

async function processImages() {
  const args = process.argv.slice(2);
  let filesToProcess = [];

  if (args.length > 0) {
    filesToProcess = [args[0]];
  } else {
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          filesToProcess.push(path.join(dir, file));
        }
      }
    }
  }

  for (const filePath of filesToProcess) {
    const file = path.basename(filePath);
    if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) continue;
    
    console.log(`Processing: ${file}...`);
      
      try {
        // Convert to file:// URL to avoid "Unsupported protocol: c:" error on Windows
        const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
        
        // Remove background using imgly AI
        const blob = await removeBackground(fileUrl);
        
        // Convert Blob to Buffer
        const buffer = Buffer.from(await blob.arrayBuffer());
        
        // Overwrite the file with the transparent version
        fs.writeFileSync(filePath, buffer);
        console.log(`Success: ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  console.log('Finished processing all images!');
}

processImages();
