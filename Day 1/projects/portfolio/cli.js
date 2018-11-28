const http = require('http');
const fs = require('fs');


// const imgArr = ['2.png', '3.png', '4.png', '5.png', '6.png', '7.png']

const imgArr = ['about-img.jpg']

const server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/') {
    
    fs.readFile('./index.html', (err, data) => {
      if (err) console.log(err);
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if(req.url === '/assets/style.css') {
      fs.readFile('./assets/style.css', (err, data) => {
        if (err) console.log(err);
        res.writeHeader(200, {'Content-Type': 'text/CSS'});
        res.write(data);
        res.end();
      });
  } else if(req.method === 'GET' && req.url === '/about') {
    fs.readFile('./about.html', (err, data) => {
      if (err) console.log(err);
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if(req.method === 'GET' && req.url === '/contact') {
    fs.readFile('./contact.html', (err, data) => {
      if (err) console.log(err);
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if(true) {
    for(const img of imgArr) {
      if(req.url === `/assets/media/about/${img}`) {
        fs.readFile(`./assets/media/about/${img}`, (err, data) => {
          if (err) console.log(err);
          res.writeHeader(200, {'Content-Type': 'image/jpeg'});
          res.write(data);
          res.end();
        }); 
      }
    }
  } else {
    res.end(req.url)
  }
}).listen(4000, () => {
  console.log('running server on port 4000');
})