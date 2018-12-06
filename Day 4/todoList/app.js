const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path')

app.use(express.static(path.join(__dirname + '/style')));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  switch (req.body.method) {
    case 'PUT':
      req.method = 'PUT';
      next();
      break;
    case 'DELETE':
      req.method = 'DELETE'
      next();
      break;
    default:
      next();
  }
})

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
  else console.log('connected to mongoose');
})

const Schema = mongoose.Schema;

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

app.post('/new', (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({title, description});
  newTodo.save((err, todo) => {    
    Todo.find({}, (err, data) => {
      res.redirect('/');
    })
  })
});

app.put('/todos/:id', (req, res) => {
  if(req.body) {
    Todo.updateOne({_id : req.params.id},{$set: {...req.body}}, (err, todo) => {
      if(err) throw err;
      res.redirect('/');
    })
  }
});

app.get('/todos/:id/delete', (req, res) => {
  Todo.remove({ _id: req.params.id }, (err, todo) => {
    res.redirect('/');
});
});


app.listen(4000, () => {
  console.log('server running on port 4000');
});
