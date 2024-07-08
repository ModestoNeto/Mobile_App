const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'google-services.json');
const fileContent = fs.readFileSync(filePath, 'utf8');
const base64Content = Buffer.from(fileContent).toString('base64');

console.log(base64Content);
