var express = require('express');
var router = express.Router();
var config = require('../config.js');
var nodeMailer = require('nodemailer');

/* POST new mail */
router.post('/', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: config.smtp,
        port: smtpPort,
        secure: true,
        auth: {
            user: config.email,
            pass: config.auth
        }
        // host: 'smtp.ethereal.email',
        // port: 587,
        // auth: {
        //     user: 'l3sdjcsyhbw5foiu@ethereal.email',
        //     pass: 'MknZnfnRkmRxFFKvHv'
        // }
    });
    console.log('Mail data: %s, %s, %s, %s', req.user.name, req.user.email, req.user.phone, req.user.message);
    let mailOptions = {
        from: '"' + req.user.name + '" <' + req.user.email + '>',
        to: 'kevinmm.19@gmail.com',
        subject: req.user.name + ' - ' + req.user.phone,
        text: req.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
            console.log('Success: ' + error + ', info: ' + info);
            console.log('Message %s sent: %s', info.messageId, info.response);
            // Preview only available when sending through an Ethereal account
            //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // req.url = '/confirm';
            // req.method = 'GET';
            // return router._router.handle(req, res, next);
            res.json({ success: true, url: '/confirm' });
        } else {
            console.log('Mail error: ' + error);
            res.json({ success: false, url: '/error' });
            // req.url = '/error';
            // req.method = 'GET';
            // req.description = 'El servidor no ha podido enviar el correo a IPN, favor intentar nuevamente.';
            // return router._router.handle(req, res, next);
            // res.render('error', {
            //     title: 'IPN - Error',
            //     heroTitle: 'Error: 500',
            //     description: 'El servidor no ha podido enviar el correo a IPN, favor intentar nuevamente.',
            //     name: 'error',
            //     back: true
            // });
        }
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

module.exports = router;