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
const Post = require('./server/models/Post');
const auth = require('./server/modules/auth');

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
  cookie : { maxAge : 6000000 },
  store : new MongoStore({ url : 'mongodb://localhost/mediumClone-session' }),
  resave : true,
  saveUninitialized : true
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
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/dashboard', (req, res) => {
  Post.find({ }, { password : 0 }, (err , data) => {
    if(err) throw err;
    console.log(data);
    res.json({ data: data })
  })
});

app.get('/signup', (req, res) => {
  res.render('index')
})
app.get('/login', (req, res) => {
  res.render('index');
})

app.get('/create', (req, res) => {
  res.render('index');
})

app.post('/api/login', function(req, res, next) {
  console.log(req.user, "req.user in post login")
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ user: req.user })
    });
  })(req, res, next)
});

app.post('/create', (req, res) => {
  const postObj = {
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    claps: 0,
    date: new Date()
  }
  Post.findOneAndUpdate({ userId: req.user._id }, { $push : { allPosts : postObj}}, { upsert: true }, (err, data) => {
    Post.find({ userId: req.user._id }, (err, data) => {
      res.json(data);
    })
  })
})

app.get('/story/:title', (req, res) => {
  let params = req.params.title.split(":")[1]
  console.log(req.params,params, "in story url ")
  Post.findOne({ title : params }, (err, data) => {
    res.json(data);
  })

})

app.get('/isLoggedin', auth.isLoggedIn,(req, res) => {
  console.log(req.user, "req user for check user")
  User.findOne({ _id: req.user._id }, { password: 0 }, function(err, user) {
    if(err) throw err;
    res.json({ user: user })
  });
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).redirect('/login')
})

app.get('*', (req, res) => {
  res.send('404 not found');
})

// app.use('/api', require('./server/routes/apiRoutes'));
app.use(require('./server/routes/routes'));

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
