var express = require('express');
var router = express.Router();
const Blog = require('./../models/Blog');
const Service = require('./../models/Service');
const Page = require('./../models/pages');
// Get Homepage
router.get('/login', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

router.get('/users/new-blog', ensureAuthenticated, function(req, res){
	res.render('new-blog');
});

router.get('/users/new-service', ensureAuthenticated, function(req, res){
	res.render('new-service');
});

router.get('/users/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});



  



router.get('/users/blog-admin', function (req, res, next) {
  var perPage = 6
  var page = req.param('page') || 1
  console.log('PAGE: ',req.param('page'));
  Blog
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, blogs) {
        Blog.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('blog-admin', {
                  blogs,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          });
      });

});

router.get('/users/service-admin', function (req, res, next) {
    Service.find({}, (err, services) => {
      if (err) console.log('Error in find services');
      res.render('services-admin',{services:services});
    });
});

// router.get('/users/service-admin', function (req, res, next) {
//   var perPage = 2
//   var page = req.param('page') || 1
//   console.log('PAGE: ',req.param('page'));
//   Service
//       .find({})
//       .skip((perPage * page) - perPage)
//       .limit(perPage)
//       .exec(function(err, services) {
//         Service.count().exec(function(err, count) {
//               if (err) return next(err)
//               res.render('services-admin', {
//                   services,
//                   current: page,
//                   pages: Math.ceil(count / perPage)
//               })
//           });
//       });
// });


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/', function(req, res){
   var perPage = 6
  var page = req.param('page') || 1
  console.log('PAGE: ',req.param('page'));
  Blog
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, blogs) {
        Blog.count().exec(function(err, count) {
            Page.findOne({"pagename" : "index"}, function (err, page) {
                console.log('index');
              if (err) return next(err)
              res.render('index', {
                  blogs,
                  current: page,
                  pages: Math.ceil(count / perPage), page:page
              })
          });
      });
	// res.render('index');
});
});
module.exports = router;