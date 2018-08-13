var express = require('express');
var router = express.Router();
const Page = require('./../models/pages')

router.postleads= (req, res) => {
  var data = new Page(req.body);
  data.save(function(err){
   if(err){
    res.render('contact', { message: 'Invalid request!' });
   }else{
    res.render('contact', { message: 'User registered successfully!'});
   } 
  });
 };



module.exports = router;
