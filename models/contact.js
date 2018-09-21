var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

// Contact model creation to use the contactSchema
var Contact = mongoose.model('Contact', contactSchema, 'contact');

// methods
contactSchema.methods.add = function(user, msg) {
    return new Promise(function (resolve, reject) {
        var contact = new Contact();
        contact.userId = user._id;
        contact.message = msg;
        contact.save(function(err, doc) {
            if (err) {
                resolve({success: false, contact: null});
            }
            resolve({success: true, contact: doc});
        });
    });
}

module.exports = Contact;