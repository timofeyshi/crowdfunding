var mongoose = require('mongoose');

var userScheme = new mongoose.Schema( {
    login: { type: String},
    password: { type: String },
   // salt: { type: String }, 
    email: { type: String }
   // date: { type: Number },
   // role: { type: Number },
  //  valute: {type: Number},
  //  language: { type: Number },
  //  rate: { type: Number }
} );


module.exports = function(db) {

var User= db.model("User",userScheme);
return User;

}