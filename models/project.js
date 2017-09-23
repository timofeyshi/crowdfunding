var mongoose = require('mongoose');



var projectScheme = new mongoose.Schema( {
    title: { type: String},
    money: { type: Number },
    curMoney: {type: Number},
    description: { type: String },
    date: { type: Number },
    endDate: { type: Number },
    valute: {type: Number},
    image: { type: String },
    owner: {type:String}
} );

projectScheme.index({title: 'text', description: 'text'});

module.exports = function(db) {

var project= db.model("project",projectScheme);
return project;

}