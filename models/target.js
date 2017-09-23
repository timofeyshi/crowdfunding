var mongoose = require('mongoose');

var targetScheme = new mongoose.Schema( {
    idProject: { type: String},
    title: {type:String},
    description:{type:String},
    sum: {type: Number },
    date:{type: Number}
} );

targetScheme.index({title: 'text',description: 'text'});

module.exports = function(db) {

var target= db.model("target",targetScheme);
return target;

}