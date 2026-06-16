import * as fs from 'fs';
import * as path from 'path';
import { mockStory } from '../src/mock/storyData';

const targetPath = path.join(__dirname, '..', '..', 'backend-amordoce', 'src', 'dialogue', 'mock', 'storyData.json');

try {
  const jsonContent = JSON.stringify(mockStory, null, 2);
  fs.writeFileSync(targetPath, jsonContent, 'utf-8');
  console.log(`Successfully synced storyData to ${targetPath}`);
} catch (error) {
  console.error('Error syncing storyData:', error);
  process.exit(1);
}
