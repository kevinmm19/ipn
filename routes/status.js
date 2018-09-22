var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET ERROR. */
router.get('/', function(req, res, next) {
    let code = req.params.code;
    if(code !== undefined && code === 's') {
        res.render('status', {
            title: 'IPN - Success',
            heroTitle: '¡Gracias por contactarnos!',
            description: 'Responderemos tu mensaje, en la menor brevedad posible.',
            href: '/contacto'
        });
    } else {
        res.render('status', {
            title: 'IPN - Error',
            heroTitle: 'Error: 500',
            description: '¡Error interno de servidor! Favor intentarlo nuevamente.',
            href: '/contacto'
        });
    }
});

module.exports = router;
