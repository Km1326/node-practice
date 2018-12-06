const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
  
  if(req.method === 'GET') {
    switch (req.url) {
      case '/':
        fs.readFile('./index', (err, data) => {
          if(err) throw err;
          res.writeHeader(200, { 'Content-Type': 'text/html' });
          res.write(data);
          res.end();
        });
        break;
      case '':
      fs.readFile('.', (err, data) => {
        if(err) throw err;
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      });
      default:
        res.statusCode = 404;
        return res.end('Not Found');
    }
  } else if(req.method === 'POST' && req.url === '/new') {
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




