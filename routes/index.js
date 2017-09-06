const express = require('express');

const router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/zv');
}




module.exports = function (passport,db) {
  const project = require('../models/project')(db);

  const addUser = function (title, money, description, valute, image, date, endDate) {
    const newProject = new project({ title, money, description, valute, image, date, endDate });
    console.log(newProject);
    newProject.save((err, newUser) => {
      if (err) {

      } else {

      }
    });
  };
  let skip;
  let limit;

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/zv',
    failureFlash : true  
  }));


  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/zv',
    failureFlash : true  
  }));


  router.get('/home', isAuthenticated, function(req, res){
    res.send('hello');
  });

  router.get('/zv', function(req, res){
    res.send('noooo');
  });


  router.get('/give', function(req, res){
    res.send(req.user);
  });


  router.get('/projects', (req, res) => {
    if (req.query.limit === undefined) {
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

    project.find((err, users) => {
      res.send(users.slice(skip, limit));
      console.log('vibor');
    });
  });

  router.post('/projects', (req, res) => {
    addUser(req.body.title, req.body.money, req.body.description, req.body.valute, req.body.image, req.body.date, req.body.endDate);
    console.log(req.body.title);
    res.send('Hello');
  });

  router.get('/projects/:id', (req, res) => {
    project.findById(req.params.id, (err, doc) => {
      if (err) return console.log(err);

      
      res.send(doc);
    });
  });

  router.put('/projects/:id', (req, res) => {
    console.log(req.body.description);

    project.findByIdAndUpdate(req.params.id, { title: req.body.title,
      money: req.body.money,
      description: req.body.description,
      valute: req.body.valute,
      image: req.body.image,
      date: req.body.date,
      endDate: req.body.endDate }, (err, user) => {
      if (err) return console.log(err);
      console.log('Обновленный объект', user);
    });
    res.send('you update id project');
  });

  router.delete('/projects/:id', (req, res) => {
    project.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) return console.log(err);

      console.log('Удален пользователь ', doc);
    });

    res.send('you delete id project');
  });

  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
