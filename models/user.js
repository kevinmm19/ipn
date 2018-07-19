var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    number: String,
    createdAt: { type: Date, default: Date.now },
    active: Boolean
});

// User model creation to use the userSchema
var User = mongoose.model('User', userSchema, 'user');

// methods
User.find({}, function(err, users) {
    if (err) throw err;
  
    // object of all the users
    console.log('Users Found: ' + users.length);
    //console.log(users);
});

// make this available to the user in the Node application
module.exports = User;