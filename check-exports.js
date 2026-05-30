const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'node_modules/@tsparticles/react/index.js');
try {
  const content = fs.readFileSync(indexFile, 'utf8');
  console.log('--- index.js content ---');
  console.log(content);
} catch (e) {
  console.log('Error reading index.js:', e.message);
}
