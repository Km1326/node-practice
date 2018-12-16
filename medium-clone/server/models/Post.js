const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  userId : {type : ObjectId, ref : 'User'},
  allPosts : [{
    title : String,
    description : String,
    body : String,
    claps : Number,
    date : { type : Date },
  }]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
