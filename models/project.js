var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    goal: String,
    success: String,
    duration: String
});

// Project model creation to use the projectSchema
var Project = mongoose.model('Project', projectSchema, 'project');

// make this available to the user in the Node application
module.exports = Project;