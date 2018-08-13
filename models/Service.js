const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: String,
  summary: String,
  serviceinfo:String,
  description: String,
  featureimage: String,
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
}, { timestamps: true });

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;