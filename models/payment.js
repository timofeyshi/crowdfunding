var mongoose = require('mongoose');

var paymentScheme = new mongoose.Schema( {
    idProject: { type: String},
    idUser:{type:String},
    loginUser:{type:String},
    sum: {type: Number },
    date:{type: Number}
} );


module.exports = function(db) {

var payment= db.model("payment",paymentScheme);
return payment;

}