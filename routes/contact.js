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
router.post('/', function(req, res, next) {
  
  let response = Contact.add(req);
  console.log('Response contact.save: ' + response);
  if(!response.error) {
    req.url = '/mail';
    //req.user = response.contact;
    return router._router.handle(req, res, next);
  } else {
    res.render('error', {
      title: 'IPN - Error',
      heroTitle: 'Error: 500',
      description: 'El servidor ha fallado, favor intentar nuevamente.',
      name: 'error',
      back: true
    });
  }
});

module.exports = router;
