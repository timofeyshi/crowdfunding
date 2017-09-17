var mongoose = require('mongoose');

var commentScheme = new mongoose.Schema( {
    idProject: { type: String},
    idUser:{type:String},
    loginUser:{type:String},
    text: {type: String },
    date:{type: Number}
} );


module.exports = function(db) {

var comment= db.model("comment",commentScheme);
return comment;

}