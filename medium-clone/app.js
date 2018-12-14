const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./server/models/User');
const cors = require('cors');
const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(cors());

app.set('views', './server/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/mediumClone', (err, connection) => {
  if(err) throw err;
  else console.log('connected to mongoose');
})


app.get('/', (req, res) => res.render('index'));

app.get('/signup', (req, res) => {
  res.render('signUp')
})

app.post('/signup', (req, res) => {
  const {name, username, email, password} = req.body;
  const newUser = new User({name, username, email, password});
  newUser.save((err, data) => {
    if(err) throw err;
    else { 
      console.log(data, "send data in mongoose")
      return res.status(200).json({
        "message" : "signup successfull"
      })
    }
  })
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', (req, res) => {
  User.findOne({username : req.body.username, password : req.body.password}, (err, data) => {
    if(!data) {
      return res.status(404).json({
        "message" : "username and password not exist"
      })
    }
    else {
    return res.status(200).json({
      "message" : "loggedIN"
    })
    }
  })
})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})