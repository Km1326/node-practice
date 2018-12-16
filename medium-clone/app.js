const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./server/models/User');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const port = 7000;
const Post = require('./server/models/Post')

mongoose.connect('mongodb://localhost/mediumClone', (err, connection) => {
  if(err) throw err;
  else console.log('connected to mongoose');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('./dist', express.static(path.resolve(__dirname, 'dist')));

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret : 'medium-clone',
  cookie : { maxAge : 6000 },
  resave : true,
  saveUninitialized : true,
  store : new MongoStore({ url : 'mongodb://localhost/mediumClone-session' })
}));

// webpack middlware
if(process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware')
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(passport.initialize());
app.use(passport.session());
require('./server/modules/passport')(passport)
app.use(cors());


app.get('/', (req, res) => res.render('index'));

// app.get('/signup', (req, res) => {
//   res.render('signUp')
// })

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

app.get('/create', (req, res) => {
  res.render('index');
})

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ user: req.user })
    });
  })(req, res, next)
});

// app.get('*', (req, res) => {
//   res.send('404 not found');
// })

app.post('/create', (req, res) => {
  console.log(req.body, "post req body")
  const postObj = {
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    claps: null,
    date: new Date()
  }

  console.log(postObj, req.user, "check data and id");

})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
