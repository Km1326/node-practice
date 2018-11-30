const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('./views'));
app.use('/assets',express.static('./assets'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


function setPath(res, pathname) {
  return res.sendFile(path.join(__dirname + pathname))
}

app.get('/', function(req, res) {
  res.send()
})

app.get('/about', (req, res) => {
  setPath(res, '/views/about.html');
})

app.get('/contact', (req, res) => {
  setPath(res, '/views/contact.html');
})

app.get('/project', (req, res) => {
  setPath(res, '/views/project.html');
})

app.get('/contact/list', (req, res) => {
  setPath(res, '/views/contactData.txt');
})

app.post('/contact', (req, res) => {
  fs.readFile('./data.json', (err, data) => {
    data = JSON.parse(data);
    data.contacts.push(req.body);
    fs.writeFile('data.json', JSON.stringify(data), (error) => {
      if(error) throw error;
    });
  })
  res.send('thanks!!!');
})

app.listen(4000, () => {
  console.log('server running on port http://localhost:4000')
})