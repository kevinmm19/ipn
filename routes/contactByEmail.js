var express = require('express');
var router = express.Router();
var config = require('../config.js');
var user = require('../models/user');
var request = require('request');

router.param('email', function (req, res, next, email) {
    console.log('Email param: ' + email);
    if (email.length) {
        req.email = email;
        next();
    }
    else {
        next('route');
    }
    //next();
});
  
  /* GET contact page. */
router.get('/:email', function(req, res, next) {
    // user.find({ email: email }, function(err, content) {
    //   console.log('User: ' + content.length);
    //   res.send(content);
    // });
    if(req.query.length){
        console.log('Email query: ' + req.query.email);
    } else {
        console.log('Query: ' + req.query);
    }
    console.log('Req body email: ' + req.body.email);
    console.log('Req body phone: ' + req.body.phone);
    console.log('Req param email: ' + req.param('email'));
    console.log('Req param phone: ' + req.param('phone'));
    console.log('Req Params email: ' + req.params.email);
    console.log('Req Params phone: ' + req.params.phone);
    console.log('Req Query email: ' + req.query.email);
    console.log('Req Query phone: ' + req.query.phone);
    user.findOneAndUpdate(
        { email: req.body.email }, 
        { 
            name: req.body.name,
            number: req.body.phone 
        }, 
        {
            runValidators: true
        }, 
        function (err, doc) {
            if (err) {
                console.log('Fail en findOneAndUpdate: ' + doc);
                res.render('error', {
                    title: 'IPN - Error',
                    heroTitle: 'Error: 500',
                    description: 'Fallo en findOneAndUpdate: ' + err,
                    name: 'error',
                    back: true
                });
            } else {
                console.log('Success en findOneAndUpdate: ' + doc);
                    res.render('confirmation', {
                    title: 'IPN - Success',
                    heroTitle: '¡Gracias por contactarnos!',
                    description: 'Nos pondremos en contacto en la menor brevedad posible.',
                    name: 'error',
                });
            }
            // doc.name = 'jason bourne';
            // doc.save(callback);
        }
    );
});

module.exports = router;
