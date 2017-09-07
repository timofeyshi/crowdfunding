var mongoose = require('mongoose');

var verifyScheme = new mongoose.Schema( {
    id: { type: String},
    passport: { type: String },
    scan: {type: String }
} );


module.exports = function(db) {

var verify= db.model("verify",verifyScheme);
return verify;

}