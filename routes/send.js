var express = require('express');
var router = express.Router();
var config = require('../config.js');
var nodeMailer = require('nodemailer');

/* POST new contact */
router.post('/', function (req, res) {
    let transporter = nodeMailer.createTransport({
        // host: config.smtp,
        // port: smtpPort,
        // secure: true,
        // auth: {
        //     user: config.email,
        //     pass: config.auth
        // }
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'l3sdjcsyhbw5foiu@ethereal.email',
            pass: 'MknZnfnRkmRxFFKvHv'
        }
    });
    let mailOptions = {
        from: '"' + req.body.name + '" <' + req.body.email + '>',
        to: 'kevinmm.19@gmail.com',
        subject: req.body.name + ' - ' + req.body.phone,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
            console.log('Success: ' + error + ', info: ' + info);
            // res.render('contacto', { 
            //     title: 'IPN - Contacto',
            //     heroTitle: 'Contacto',
            //     name: 'contacto',
            //     description: 'Complete el siguiente formulario y nos estaremos comunicando con usted. También puede comunicarse con nosotros al siguiente correo electrónico: info@ipn.co.cr', 
            //     users: content 
            // });
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // res.render('contacto', { 
            //     title: 'IPN - Contacto',
            //     heroTitle: 'Contacto',
            //     name: 'contacto',
            //     description: 'Complete el siguiente formulario y nos estaremos comunicando con usted. También puede comunicarse con nosotros al siguiente correo electrónico: info@ipn.co.cr', 
            //     users: content 
            // });
            console.log(error);
            // res.render('error', {
            //     title: 'IPN - Error',
            //     heroTitle: info,
            //     name: 'error'
            // });
        }
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

module.exports = router;