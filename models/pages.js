


const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pagePostSchema = new Schema({
 
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
  twitterimage:String

 
 
});

const Page = mongoose.model('Page',pagePostSchema);

module.exports = Page;