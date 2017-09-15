const express = require('express');
var multer  = require('multer');
var markdown = require('markdown').markdown




const router = express.Router();
var filename2 = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/proimage')
  },
  filename: function (req, file, cb) {
    filename2 = file.fieldname + '-' + Date.now();
    cb(null, filename2)
  }
})

var upload = multer({ storage: storage }).single('file');


var isAuthenticated = function (req, res, next) {
  
  if (req.isAuthenticated())
    return next();
 
  res.redirect('/zv');
}


var isCreator = function (req, res, next) {
 
  if (req.isAuthenticated()) {
    if (req.user.role >= 2) {
    return next();
  }
  }
 
  res.redirect('/zv');
}




module.exports = function (passport,db) {
  const project = require('../models/project')(db);
  var confirm = require('../models/confirm')(db);
  var User = require('../models/user')(db);
  var verify = require('../models/verify')(db);

  const addUser = function (title, money, description, valute, image, date, endDate,id) {
    var zero = 0;
    const newProject = new project({ title, money, description, valute, image, date, endDate});
    newProject.curMoney = 0;
    newProject.owner = id;
    console.log(newProject);
    newProject.save((err, newUser) => {
      if (err) {

      } else {

      }
    });
  };
  let page;
  let limit;




    router.post('/verifyMe',isAuthenticated ,(req, res) => {
      if (req.user.role === 1){

        const verifyNew = new verify();
    verifyNew.id = req.user._id;
    verifyNew.passport = req.body.passport;
    verifyNew.scan = req.body.scan;
    console.log(verifyNew);
    verifyNew.save((err, newUser) => {
      if (err) {

      } else {

      }
    });




         res.send('Hello');

      } else {
         res.send('no');
      }

  });



 

router.post('/upload', function (req, res) {
  console.log("start");
  upload(req, res, function (err) {
    if (err) {
      console.log(err);// An error occurred when uploading
      return;
    }
    res.send(filename2);
    console.log(filename2);
    // Everything went fine
  })
})


     router.get('/newVerify', isAuthenticated, function(req, res){
       if (req.user.role === 3){
      verify.find((err, users) => {
      res.send(users);
      console.log('vibor');
    });

    } else {
       res.send("error");
    }
  });



      router.delete('/verify/:id', isAuthenticated,(req, res) => {

    
      
   if (req.user.role === 3) {
    verify.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) return console.log(err);

      console.log('Удален пользователь ', doc);
    });

    res.send('you delete id project');

} else {
    res.redirect('/zv');

}
    

    

  });




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
    console.log(req.user);
  if(req.user != undefined) {  res.send(req.user);} else {res.send("noooo");}
  });







  router.get('/projects', (req, res) => {
    
    if (req.query.page == undefined) {
      page = 1;
    } else {
      page = req.query.page;
    }
    console.log(page);
    var startProj = (page-1)*8;

    var endProj = page*8;
    
    project.find((err, users) => {
      res.send(users.slice(startProj, endProj));
      console.log('vibor');
    });
  });

router.get('/newProjects', (req, res) => {
    

    project.find((err, users) => {
      res.send(users);
      console.log('vibor');
    }).sort({date:-1});
  });


router.get('/getPages', (req, res) => {
    

    project.find((err, users) => {
      res.send({"length":users.length});
      console.log('vibor');
    });
  });



router.get('/myProjects',isAuthenticated, (req, res) => {
    

    project.find({owner: req.user._id}, (err, users) => {
      res.send(users);
      console.log('vibor');
    });
  });

router.get('/myLang', (req, res) => {
       if (req.user != undefined) {
   

       User.findById(req.user.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       if (doc.language == 1) {
        res.send({lang:"ru"});
       } else {
        res.send({lang:"en"});
       }
     


} else {
  res.send("error");
}

      
    });



    } else {
    if (req.session.lang == undefined) {
      res.send({lang:"en"});
    } else {
      res.send({lang:req.session.lang});
    }
    }
  });

router.get('/setRu', (req, res) => {
    if (req.user != undefined) {
   

       User.findById(req.user.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       doc.language = 1;
      doc.save((err, newUser) => {
      if (err) {

      } else {

      }
    });


} else {
  res.send("error");
}

      
    });



    }
    
    req.session.lang = "ru";
    
    res.send("ok");
  });

router.get('/setEn', (req, res) => {
       if (req.user != undefined) {
   

       User.findById(req.user.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       doc.language = 0;
      doc.save((err, newUser) => {
      if (err) {

      } else {

      }
    });


} else {
  res.send("error");
}

      
    });



    }
    req.session.lang = "en";
     res.send("ok");
    
  });

router.get('/myColor', (req, res) => {
       if (req.user != undefined) {
   

       User.findById(req.user.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       if (doc.rate == 1) {
        res.send({color:"black"});
       } else {
        res.send({color:"white"});
       }
     


} else {
  res.send("error");
}

      
    });



    } else {
    if (req.session.color == undefined) {
      res.send({color:"white"});
    } else {
      res.send({color:req.session.color});
    }
    }
  });

router.get('/setBlack', (req, res) => {
    if (req.user != undefined) {
   

       User.findById(req.user.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       doc.rate = 1;
      doc.save((err, newUser) => {
      if (err) {

      } else {

      }
    });


} else {
  res.send("error");
}

      
    });



    }
    
    req.session.color = "black";
    
    res.send("ok");
  });

router.get('/setWhite', (req, res) => {
       if (req.user != undefined) {
   

       User.findById(req.user.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       doc.rate = 0;
      doc.save((err, newUser) => {
      if (err) {

      } else {

      }
    });


} else {
  res.send("error");
}

      
    });



    }
    req.session.color = "white";
     res.send("ok");
    
  });





router.get('/verify/:id',isAuthenticated, (req, res) => {
  if (req.user.role === 3){
    User.findById(req.params.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
  }
      if (doc != null) {

       if (doc.role === 1) doc.role = 2; 
      doc.save((err, newUser) => {
      if (err) {

      } else {

      }
    });

res.send(doc);
} else {
  res.send("error");
}

      
    });
} else  {

res.send("error");

}
  });






// Only for testing 
// Delete this 
  router.get('/confirms', (req, res) => {
    

    confirm.find((err, users) => {
      res.send(users);
      console.log('vibor');
    });
  });
//End Delete

  router.get('/confirm/:id', (req, res) => {

    confirm.findOne({key: req.params.id} ,(err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
}
      if (doc != null) {
      var confirmId = doc.id; 
      console.log(confirmId);
      User.findById(confirmId, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
}
      if (doc.role === 0) doc.role = 1; 
      doc.save((err, newUser) => {
      if (err) {

      } else {

      }
    });
     
      res.redirect('/#/panel');
    });
    } else {
            res.send("error");
    }


      
    });
  });







  router.post('/projects',isCreator ,(req, res) => {
    addUser(req.body.title, req.body.money, req.body.description, req.body.valute, req.body.image, req.body.date, req.body.endDate,req.user._id);
    console.log(req.body.title);
    res.send('Hello');
  });



  router.get('/projects/:id', (req, res) => {
    project.findById(req.params.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
}     
      var mark = doc.description;
      doc.description = markdown.toHTML(mark);
console.log(doc);
      res.send(doc);
    });
  });


       router.get('/projectsMark/:id', (req, res) => {
    project.findById(req.params.id, (err, doc) => {
      if (err) {  res.send("error");
        return console.log(err);
}     
      var mark = doc.description;
      doc.description = mark;
console.log(doc);
      res.send(doc);
    });
  });


  router.put('/projects/:id', isAuthenticated,(req, res) => {
    console.log(req.body);


 project.findById(req.params.id, (err, doc) => {
  if (err) return console.log(err);
      var idOwner = doc.owner;
   if (idOwner === req.user.id || req.user.role === 3) {
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
} else {
    res.redirect('/zv');

}
    });




  });

  router.delete('/projects/:id', isAuthenticated,(req, res) => {

    project.findById(req.params.id, (err, doc) => {
      if (err) return console.log(err);
      var idOwner = doc.owner;
   if (idOwner === req.user.id || req.user.role === 3) {
    project.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) return console.log(err);

      console.log('Удален пользователь ', doc);
    });

    res.send('you delete id project');

} else {
    res.redirect('/zv');

}
    });

    

  });

  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
