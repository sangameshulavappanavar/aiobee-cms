var express = require('express');
var router = express.Router();
const Lead = require('./../models/leads')
const Page = require('./../models/pages')

router.postleads= (req, res) => {
  console.log('contact page');
  Page.findOne({"pagename" : "contact"}, function(err, page) {
    console.log(page);
  var data = new Lead(req.body);
  data.save(function(err){
   if(err){
    res.render('contact', { message: 'Invalid request!' });
   }else{
    res.render('contact', {page:page });
   } 
  });
});
 };

 router.get('/', function(req,res){
   console.log('contact page');
  Page.findOne({"pagename" : "contact"}, function(err, page) {
    console.log(page);
    if (err) console.log('Error in find services'); 
  res.render('contact', {page:page});
});
});

module.exports = router;
