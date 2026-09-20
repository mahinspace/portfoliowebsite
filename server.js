const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let targetFile = reqPath === '/' ? 'index.html' : reqPath;
  
  // Normalize Windows paths
  let filePath = path.join(PUBLIC_DIR, targetFile);

  // If file doesn't have an extension, try appending .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  // Check if file exists locally
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Fallback: proxy from original live site so every single link and asset loads perfectly!
  const remoteUrl = 'https://shadat.co' + req.url;
  https.get(remoteUrl, { headers: { 'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0' } }, (remoteRes) => {
    if (remoteRes.statusCode >= 300 && remoteRes.statusCode < 400 && remoteRes.headers.location) {
      res.writeHead(remoteRes.statusCode, { 'Location': remoteRes.headers.location });
      res.end();
      return;
    }
    res.writeHead(remoteRes.statusCode, remoteRes.headers);
    remoteRes.pipe(res);
  }).on('error', (err) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p>' + err.message + '</p>');
  });
});

server.listen(PORT, () => {
  console.log(`Local web server active at: http://localhost:${PORT}/`);
});
