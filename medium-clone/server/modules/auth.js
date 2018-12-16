module.exports = {
  isLoggedIn : function(req, res, next) {
    if(req.user) {
      return next()
    } else {
      res.state(400).send({ message : 'please login' })
    }
  }
}