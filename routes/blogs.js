var express = require('express');
var router = express.Router();
const Blog = require('./../models/Blog');
const Page = require('./../models/pages');

/* GET home page. */
router.get('/', function (req, res, next) {
  Page.findOne({"pagename" : "blogs"}, function (err, page) {
  var perPage = 6
  var page = req.param('page') || 1
  console.log('PAGE: ',req.param('page'));
  Blog
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, blogs) {
        
          console.log(page);
        Blog.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('blogs', {
                  blogs,
                  current: page,
                  pages: Math.ceil(count / perPage), page:page
              })
          });
      });
    });
});

router.get('/new', ensureAuthenticated, function (req, res, next) {
  res.render('new-blog');
});

router.get('/edit/:id', ensureAuthenticated, function (req, res, next) {
  Blog.findOne({ '_id': req.params.id }, (err, blog) => {
    if (err) console.log('Error in find blogs');
    res.render('new-blog', { title: 'Blog Edit', blog });
  });
});

router.get('/delete/:id', ensureAuthenticated, function(req, res){
  console.log('delete');
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {  return next(err); 
      console.log(err);
      res.send('error in deleting Blog');
    } else {
      res.send('Blog deleted');
    }
  });
});


// router.get('/users/blog-admin', ensureAuthenticated, function (req, res, next) {
//   Blog.findOne({ '_id': req.params.id }, (err, blog) => {
//     if (err) console.log('Error in find blogs');
//     res.render('blog-admin', { title: 'Blog Edit', blog });
//   });
// });

router.get('/:name/:id', function (req, res, next) {
  Blog.findOne({ '_id': req.params.id }, (err, blog) => {
    if (err) console.log('Error in find blogs');
    res.render('blog', { title: 'Blog Details', blog });
  });
});

router.post('/save', function (req, res, next) {
  const blog = new Blog(req.body);
  console.log(blog);

  if (req.body._id != undefined && req.body._id != '') {
    Blog.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, blog) => {
        console.log('Blog: ', blog);
        if (err) return res.status(500).send(err);
        // res.redirect('/areas');
        res.redirect('/blogs');
      }
    );
  }
  else {
    console.log('Blog', typeof blog);
    blog.save((err, blog) => {
      res.redirect('/blogs');
    })
  }
});





function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}



module.exports = router;
