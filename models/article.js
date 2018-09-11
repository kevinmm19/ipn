var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    url: String,
    intro: String,
    image: String,
    author: String,
    date: String,
    active: { type: Boolean, default: true }
});

// Article model creation to use the articleSchema
var Article = mongoose.model('Article', articleSchema, 'article');

// make this available to the user in the Node application
module.exports = Article;