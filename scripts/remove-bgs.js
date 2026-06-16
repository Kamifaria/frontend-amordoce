const fs = require('fs');
const path = require('path');
const { removeBackground } = require('@imgly/background-removal-node');

const spritesDir = path.join(__dirname, '../public/images/sprites');

async function processImage(filePath, fileName) {
  try {
    console.log(`Processing: ${fileName}`);
    // We pass the absolute path as a file:// URL
    const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
    const blob = await removeBackground(fileUrl);
    const arrayBuffer = await blob.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);

    // Overwrite the original file
    fs.writeFileSync(filePath, resultBuffer);
    console.log(`Successfully removed background for: ${fileName}`);
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error.message);
  }
}

async function run() {
  const files = fs.readdirSync(spritesDir);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
  
  console.log(`Found ${pngFiles.length} PNG images to process.`);

  // Process sequentially to avoid memory overload
  for (const file of pngFiles) {
    const filePath = path.join(spritesDir, file);
    await processImage(filePath, file);
  }
  
  console.log('Background removal complete!');
}

run();
