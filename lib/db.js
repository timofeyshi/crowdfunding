var mongoose    = require('mongoose');

var db = mongoose.createConnection('localhost:27017/');

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected!")
});

var projectScheme = new mongoose.Schema( {
    title: { type: String},
    money: { type: Number },
    description: { type: String },
    date: { type: Number },
    endDate: { type: Number },
    valute: {type: Number},
    image: { type: String }
} );

var project= db.model("project",projectScheme);

var addUser = function(title,money,description,valute,image,date,endDate) {

var newProject = new project({ title: title, money: money, description: description,valute:valute,image:image,date:date,endDate:endDate});

newProject.save(function (err, newUser) {
    if (err){
      
    }else{
       
    }
});

};
var getAll = function() {


project.find(function (err, users) {
        console.log(users)
    })
};

var getById = function(id) {
	project.findById(id, function(err, doc){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
   // console.log(doc);
    return doc;
});
}

module.exports.addUser = addUser;
module.exports,project = project;
module.exports.getAll = getAll;
module.exports.getById = getById;