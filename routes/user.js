var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST user. */
router.post('/', async function(req, res, next) {
  console.log('Inside POST user');
  let response = await User.schema.methods.add(req, res);
  console.log('Response: ' + response);
  if(response !== null) {
      //console.log('Response user._id: ' + response._id);
      req.url = '/contacto';
      console.log('Before /contacto: user._id %s', response._id);
      req.user = response;
      req.message = req.body.message;
      res.send({success: true});
      //return router._router.handle(req, res, next);
  } else {
      console.log('Response response.error: ' + response);
      res.render('error', {
        title: 'IPN - Error',
        heroTitle: 'Error: 500',
        description: 'El servidor ha fallado, favor intentar nuevamente.',
        name: 'error',
        back: true
      });
  }
//   User.schema.methods.add(req, res).then(function(response) {
//     console.log('Response: ' + response.doc);
//     if(response.doc !== null) {
//         //console.log('Response user._id: ' + response._id);
//         req.url = '/contacto';
//         console.log('Before /contacto: user._id %s', response.doc._id);
//         req.user = response.doc;
//         req.message = req.body.message;
//         res.send({success: true});
//         //return router._router.handle(req, res, next);
//     } else {
//         console.log('Response response.error: ' + response.doc);
//         res.render('error', {
//         title: 'IPN - Error',
//         heroTitle: 'Error: 500',
//         description: 'El servidor ha fallado, favor intentar nuevamente.',
//         name: 'error',
//         back: true
//         });
//     }
//   }).catch(function(err) {
//         console.log(err);
//   });
//   console.log('Response: ' + response);
//   if(response !== null) {
//     //console.log('Response user._id: ' + response._id);
//     req.url = '/contacto';
//     console.log('Before /contacto: user._id %s', response._id);
//     req.user = response;
//     req.message = req.body.message;
//     res.send({success: true});
//     //return router._router.handle(req, res, next);
//   } else {
//     console.log('Response response.error: ' + error);
//     res.render('error', {
//       title: 'IPN - Error',
//       heroTitle: 'Error: 500',
//       description: 'El servidor ha fallado, favor intentar nuevamente.',
//       name: 'error',
//       back: true
//     });
//   }
});

module.exports = router;
