const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', './server/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/mediumClone', (err, connection) => {
  if(err) throw err;
  else console.log('connected to mongoose');
})


app.get('/', (req, res) => res.render('index'));

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})