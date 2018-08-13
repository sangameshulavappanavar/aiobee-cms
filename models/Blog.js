


const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPostSchema = new Schema({
 
 title: String,
 description: String,
 summary: String,
 authour:String,

 featuredimage:String,
 image01:String,
 image02:String,
 authour:String,
 authourimage:String,
 date:String,

 metatitle:String,
 metadescription:String,
 ogtitle:String,
 ogimage:String,
 twitterurl:String,
 twitterdescription:String,
 metakeywords:String,
 ogsite:String,
 ogdescription:String,
 twittercard:String,
 twittertitle:String,
 twitterimage:String,
 editor1:String
 
});

const Blog = mongoose.model('Blog',BlogPostSchema);

module.exports = Blog;