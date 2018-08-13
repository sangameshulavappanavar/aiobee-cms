


const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LeadPostSchema = new Schema({
 
 title: String,
 email: String,
 Phone: String,
 message:String

 
 
});

const Lead = mongoose.model('Lead',LeadPostSchema);

module.exports = Lead;