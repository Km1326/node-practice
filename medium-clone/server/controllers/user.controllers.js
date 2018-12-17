const User = require('../models/User');

module.exports = {
  signup : (req, res) => {
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
  },

  login : (req, res, next) => {
    console.log(req.user, "req.user")
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({ user: req.user })
      });
    })(req, res, next)
  }
  
}