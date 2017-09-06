var express = require('express');
var router = express.Router();







module.exports = function (db) {
var project = require('../models/project')(db);

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

router.get('/projects', function(req, res) {
  


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

router.post('/projects', function(req, res) {
  addUser(req.body.title,req.body.money,req.body.description,req.body.valute,req.body.image,req.body.date,req.body.endDate);
   console.log(req.body.title);
   res.send("Hello");
});

router.get('/projects/:id', function(req, res) {
    project.findById(req.params.id, function(err, doc){
    
     
    if(err) return console.log(err);
     
   // console.log(doc);
    res.send(doc);
});
});

router.put('/projects/:id', function (req, res){
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

router.delete('/projects/:id', function (req, res){
project.findByIdAndRemove(req.params.id, function(err, doc){
    
     
    if(err) return console.log(err);
     
    console.log("Удален пользователь ", doc);
});

    res.send('you delete id project');
});





return router;
}
