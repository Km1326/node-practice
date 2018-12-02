const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const mongoose = require('mongoose');

app.use('/',express.static('./'));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  let logString = `Method- ${req.method} - ${req.url} - ${new Date()} \n`;
  fs.appendFile('mongoDB.log', logString, (err, logSuccess) => {
    if(err) throw err;
    else console.log(logSuccess);
    next();
  })
})

mongoose.connect('mongodb://localhost/todos', (err, connection) => {
  if(err) throw err;
  else console.log('connect to mongoose');
})

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const TodoSchema = new Schema({
  title : String,
  description : String
});

const Todo = mongoose.model('Todo', TodoSchema);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  Todo.find({}, (err, data) => {
    res.render('index', {todos : data})
  })
});

app.get('/new', (req, res) => {
  res.render('newTodo');
});

app.post('/new', (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({title, description});
  newTodo.save((err, todo) => {    
    Todo.find({}, (err, data) => {
      res.redirect('/')
    })
  })
});

app.get('/todos/:id', (req, res) => {
  Todo.find({_id : req.params.id }, (err, data) => {
    if(err) throw err;
    else res.render('todos', {data})
  })
});

app.get('/todos/:id/edit', (req, res) => {
  Todo.find({_id : req.params.id }, (err, data) => {
    if(err) throw err;
    else res.render('editTodos', {data})
  })
});

app.listen(4000, () => {
  console.log('server running on port 4000');
});
