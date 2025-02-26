const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
  let contentType = 'text/html';
  let status = 200;

  let extName = path.extname(filePath);

  //file extensions to be added as required
  switch (extName) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  if (contentType == 'text/html' && extName == '') filePath += '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, data) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        );
      } else {
        console.log(err);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
