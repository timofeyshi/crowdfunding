var mongoose = require('mongoose');

var ratingScheme = new mongoose.Schema( {
    idProject: { type: String},
    idUser:{type:String},
    loginUser:{type:String},
    rate:{type: Number}
} );


module.exports = function(db) {

var rating= db.model("rating",ratingScheme);
return rating;

}