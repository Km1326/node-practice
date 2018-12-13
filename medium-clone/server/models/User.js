const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name : string,
  username : string,
  email : string,
  password : string
})

const User = mongoose.model('User', UserSchema);

module.exports = User;