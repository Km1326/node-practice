const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

app.use(express.static('./views'));
app.use('/assets',express.static('./assets'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/project', (req, res) => {
  res.render('project');
})

app.get('/contact/list', (req, res) => {
  res.sendFile(path.join(__dirname + '/data.json'));
})

app.get('/contact/list/:user', (req, res) => {
  fs.readFile('./data.json', (err, data) => {
    data = JSON.parse(data)
    const filtereddata = data.contacts.filter(d => (d.name === req.params.user))
    res.send(filtereddata[0]);
  })
  
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

app.listen(3000, () => {
  console.log('server running on port http://localhost:3000')
})