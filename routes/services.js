var express = require('express');
var router = express.Router();
const Service = require('./../models/Service')
const Page = require('./../models/pages')

/* GET home page. */
// router.get('/', function (req, res, next) {
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
//               res.render('services', {
//                   services,
//                   current: page,
//                   pages: Math.ceil(count / perPage)
//               })
//           });
//       });
// });

router.get('/', function (req, res, next) {
  Service.find({}, function(err, services) {
    Page.findOne({"pagename" : "service"}, function (err, page) {
      console.log(page);
    if (err) console.log('Error in find services');
    res.render('services',{services:services, page:page});
  });
  
});
});

router.get('/new',ensureAuthenticated, function (req, res, next) {
  res.render('new-service');
});

router.get('/edit/:id', ensureAuthenticated, function (req, res, next) {
  Service.findOne({ '_id': req.params.id }, (err, service) => {
    console.log(service);
    if (err) console.log('Error in find services');
    res.render('new-service', { title: 'service Edit', service });

  });
});

router.get('/delete/:id', ensureAuthenticated, function(req, res){
  console.log('delete');
  Service.findByIdAndRemove(req.params.id, function (err) {
    if (err) {  return next(err); 
      console.log(err);
      res.send('error in deleting Service');
    } else {
      res.send('Service deleted');
    }
  });
});

router.get('/:name/:id', function (req, res, next) {
  Service.findOne({ '_id': req.params.id }, (err, service) => {
    if (err) console.log('Error in find services');
    res.render('service', { title: 'service Details', service });
  });
});

router.post('/save', function (req, res, next) {
  const service = new Service(req.body);
  console.log(service);

  if (req.body._id != undefined && req.body._id != '') {
    Service.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, service) => {
        console.log('Service: ', service);
        if (err) return res.status(500).send(err);
        // res.redirect('/areas');
        res.redirect('/services');
      }
    );
  }
  else {
    console.log('Service', typeof service);
    service.save((err, service) => {
      res.redirect('/services');
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
