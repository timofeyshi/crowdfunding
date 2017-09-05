var express = require("express");
var app =  express();
var path = require('path'); 
var bodyParser = require('body-parser');
//var dbConection = require('./lib/db');

var mongoose    = require('mongoose');

mongoose.Promise = global.Promise;

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
//dbConection.getAll();
//dbConection.addUser("My projectdfgdfgfdg",223444343,"it's 233money for me",2,"vk.com/dfgfgdfdk.jpg",1384203,2364232);
//console.log( dbConection.getById("59ad83fe60e3bd114c5f9d24"));

app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



var addUser = function(title,money,description,valute,image,date,endDate) {

var newProject = new project({ title: title, money: money, description: description,valute:valute,image:image,date:date,endDate:endDate});
console.log(newProject);
newProject.save(function (err, newUser) {
    if (err){
      
    }else{
       
    }
});
}
  var skip;
  var limit;

app.get('/projects', function(req, res) {
  


if ( req.query.limit === undefined) {
	limit = 20;
} else {
	limit = req.query.limit;
}

if (req.query.skip == undefined) {
	skip = 0;
} else {
	skip = req.query.skip;
}
console.log(skip);
console.log(limit);

project.find(function (err, users) {
        res.send(users.slice(skip,limit));
        console.log("vibor");
    });

});

app.post('/projects', function(req, res) {
  addUser(req.body.title,req.body.money,req.body.description,req.body.valute,req.body.image,req.body.date,req.body.endDate);
   console.log(req.body.title);
   res.send("Hello");
});

app.get('/projects/:id', function(req, res) {
    project.findById(req.params.id, function(err, doc){
    
     
    if(err) return console.log(err);
     
   // console.log(doc);
    res.send(doc);
});
});

app.put('/projects/:id', function (req, res){
	console.log(req.body.description);
	
project.findByIdAndUpdate(req.params.id, {title: req.body.title,
		money:req.body.money,
		description:req.body.description,
		valute:req.body.valute,
		image:req.body.image,
		date:req.body.date,
		endDate:req.body.endDate}, function(err, user){
     
    
    if(err) return console.log(err);
    console.log("Обновленный объект", user);
});
    res.send('you update id project');    
});

app.delete('/projects/:id', function (req, res){
project.findByIdAndRemove(req.params.id, function(err, doc){
    
     
    if(err) return console.log(err);
     
    console.log("Удален пользователь ", doc);
});

    res.send('you delete id project');
});

app.listen(3000);
console.log("server run 303");