var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config.js');
var nodeMailer = require('nodemailer');

// Schema
var userSchema = new Schema({
    name: String,
    email: String,
    number: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

// User model creation
var User = mongoose.model('User', userSchema, 'user');

// Methods
userSchema.methods.sendEmail = function(user, msg) {
    return new Promise(function (resolve, reject) {
        let transporter = nodeMailer.createTransport({
            host: config.smtp,
            port: config.smtpPort,
            secure: true,
            tls: { 
                rejectUnauthorized: false 
            },
            auth: {
                user: config.emailAuth,
                pass: config.auth
            }
        });
        let mailOptions = {
            from: '"' + user.name + '" <' + user.email + '>',
            to: config.emailIPN,
            subject: user.name + ' - Teléfono: ' + user.number,
            text: msg
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
                resolve({ success: true, url: '/status/s' });
            }
            resolve({ success: false, url: '/status/e' });
        });
    });
};

userSchema.methods.add = function(req) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate(
            { email: req.body.email }, 
            { name: req.body.name, number: req.body.phone, updatedAt: Date.now() }, 
            { upsert: true, new: true }, 
            function (err, doc) {
                if (err) {
                    resolve({success: false, user: null});
                }
                resolve({success: true, user: doc});
            }
        ).catch(function(err) {
            resolve({success: false, user: null});
        });
    });
}

// make this available to the user in the Node application
module.exports = User;