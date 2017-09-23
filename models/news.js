var mongoose = require('mongoose');

var newsScheme = new mongoose.Schema( {
    id: { type: String},
    title: { type: String },
    text: {type: String },
    date:{type: Number}
} );

newsScheme.index({title: 'text',text: 'text'});

module.exports = function(db) {

var news= db.model("news",newsScheme);
return news;

}