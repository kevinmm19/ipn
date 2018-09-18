var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/user');

/* POST user. */
router.post('/', async function(req, res, next) {
  try {
    console.log('Inside POST user');
    const userRes = await User.schema.methods.add(req, res);
    console.log('Response of ADD User after await: ' + userRes);
    if(userRes !== undefined && userRes.success) {
        console.log('Response of ADD User after conditional: ' + userRes);
        //req.url = '/contact';
        //req.user = response;
        //req.message = req.body.message;
        console.log('Before post /contacto: user._id %s, %s, %s', userRes.user._id, userRes.user, req.body.message);
        request.post({
            url: '/contact',
            json: { user: userRes.user, message: req.body.message }
        }, function (error, contactRes, body) {
            if(error || !body.success) {
              res.json({ success: false, url: '/error' });
            } else {
              request.post({
                  url: '/mail',
                  json: { user: userRes.user, message: req.body.message }
              }, function (error, mailRes, body) {
                  if(error || !body.success) {
                    res.json({ success: false, url: '/error' });
                  }
                  res.send(body);
              });
            }
        });
    } else {
        console.log('ERROR POST USER, Response response.error: ' + userRes);
        req.url = '/error';
        req.method = 'GET';
        req.description = 'El servidor ha fallado, favor intentar nuevamente.';
        //console.log('Before /contacto: user._id in error: %s', response._id);
        //return router._router.handle(req, res, next);
        res.json({success: false, url: '/error'});
    }
  } catch (err) {
    console.log('CATCH POST USER, Error catch User POST: ' + err);
    req.url = '/error';
    req.method = 'GET';
    req.description = 'El servidor ha fallado, favor intentar nuevamente.';
    //return router._router.handle(req, res, next);
    res.json({success: false, url: '/error'});
  }
});

module.exports = router;
