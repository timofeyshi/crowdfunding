var mongoose = require('mongoose');

var targetScheme = new mongoose.Schema( {
    idProject: { type: String},
    title: {type:String},
    description:{type:String},
    sum: {type: Number },
    date:{type: Number}
} );


module.exports = function(db) {

var target= db.model("target",targetScheme);
return target;

}