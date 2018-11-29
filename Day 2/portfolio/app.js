const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const url = require('url');

function readFileFromSystem(url, contentType, res) {
    fs.readFile(url, (err, data) => {
      if(err) throw err;
      res.writeHeader(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    });
}

function findContentType(ext) {
  switch(ext) {
    case 'svg':
      return 'image/svg+xml';
    case 'png':
      return 'image/png';
    default:
      return 'image/jpeg'
  }
}

const server = http.createServer((req, res) => {
  
  if(req.method === 'GET') {
    switch (req.url) {
      case '/':
        return readFileFromSystem('./index.html', 'text/html', res);
      case '/about':
        return readFileFromSystem('./about.html', 'text/html', res);
      case '/project':
        return readFileFromSystem('./project.html', 'text/html', res);
      case '/contact':
        return readFileFromSystem('./contact.html', 'text/html', res);
      case '/assets/style.css':
        return readFileFromSystem('./assets/style.css', 'text/css', res);
      case '/contact/list':
        return readFileFromSystem('./contactData.txt', 'application/json', res);
      case req.url:
        fs.readFile('./contactData.txt', (err, data) => {
          if(err) throw err;
          let q = url.parse(req.url, true);
          data = JSON.parse(data);
          let qData = q.query;
          let name = qData.query;

          if(name) {
            let match = new RegExp(name, 'i'); 
            const filteredData = data.contacts.filter(contact => match.test(contact.name));
            res.writeHead(200, { 'content-type': 'application/json'})
            res.write(JSON.stringify(filteredData[0]))
            res.end();
          }
        });
        break;
      case String(req.url.match(/\/assets\/media\/.*/)):
        const imageStrArr = req.url.split(".");
        const imageNameExt = imageStrArr[imageStrArr.length - 1];
        return readFileFromSystem(`.${req.url}`, findContentType(imageNameExt), res);
      default:
        res.statusCode = 404;
        return res.end('Not Found');
    }
  } else if(req.method === 'POST' && req.url === '/contact') {
    var body = '';
    res.writeHead(200, {"Content-Type": "text/html"});
    req.on('data', function (data) {
        body += data.toString();
        console.log(body);
    });
    req.on('end', function () {
        body = parse(body);
        console.log(body);
        res.end('form submitted');
        fs.readFile('./contactData.txt', (err, data) => {
          data = JSON.parse(data);
          console.log(body);
          data.contacts.push(body);
          fs.writeFile('contactData.txt', JSON.stringify(data), (error) => {
            if(error) throw error;
          });
        })
    });
    
  }
});

server.listen(8000, () => {
  console.log('Server running at 8000');
});
