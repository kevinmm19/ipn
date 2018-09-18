var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

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
userSchema.methods.findByEmail = function(email) {
    User.findOne({email: email}).then(function(user) {
        if(!user) {
            return null;
        }
        return user;
    }).catch(done);
};

userSchema.methods.add = async function(req, res) {
    console.log('Req.body ' + req.body.name + ' ' + req.body.email + ' ' + req.body.phone);
    await User.findOneAndUpdate(
        { email: req.body.email }, 
        { name: req.body.name, number: req.body.phone, updatedAt: Date.now() }, 
        { upsert: true, new: true }, 
        function (err, doc) {
            if (err) {
                console.log('err evaluation &s', err);
                return res.json({success: false, user: null});
            }
            console.log('Before return doc &s', doc._id);
            return res.json({success: true, user: doc});
        }
    ).catch(function(err) {
        console.log(err);
        return res.json({success: false, user: null});
    });
}

// make this available to the user in the Node application
module.exports = User;