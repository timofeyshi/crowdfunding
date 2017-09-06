var mongoose = require('mongoose');

var confirmScheme = new mongoose.Schema( {
    id: { type: String},
    key: { type: String}
} );


module.exports = function(db) {

var confirm= db.model("confirm",confirmScheme);
return confirm;

}