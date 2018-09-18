var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('contacto', { 
      title: 'IPN - Contacto',
      heroTitle: 'Contacto',
      name: 'contacto',
      description: 'Complete el siguiente formulario y nos estaremos comunicando con usted. También puede comunicarse con nosotros al siguiente correo electrónico: info@ipn.co.cr'
    });
});

/* POST contact. */
router.post('/', async function(req, res, next) {
  let response = await Contact.add(req);
  console.log('Response contact.save: ' + response);
  if(response !== undefined && response.success) {
    //req.url = '/mail';
    request.post({
        url: '/mail',
        json: { user: req, message: req.body.message }
    }, function (error, response, body) {
        res.send(body);
    });
    //return router._router.handle(req, res, next);
  } else {
    req.url = '/error';
    req.method = 'GET';
    req.description = 'El servidor ha fallado, favor intentar nuevamente.';
    res.json({ success: false, url: '/error' });
    //return router._router.handle(req, res, next);
  }
});

module.exports = router;
