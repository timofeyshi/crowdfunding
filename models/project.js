var mongoose = require('mongoose');

var projectScheme = new mongoose.Schema( {
    title: { type: String},
    money: { type: Number },
    description: { type: String },
    date: { type: Number },
    endDate: { type: Number },
    valute: {type: Number},
    image: { type: String }
} );


module.exports = function(db) {

var project= db.model("project",projectScheme);
return project;

}