const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  userId : {type : ObjectId, ref : 'User'},
  allPosts : [{
    title : string,
    description : string,
    body : string,
    claps : number,
    date : { type : Date },
    comments : [{
      comment : string
    }]
  }]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
