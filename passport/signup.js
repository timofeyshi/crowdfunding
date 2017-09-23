var LocalStrategy   = require('passport-local').Strategy;

var bCrypt = require('bcrypt-nodejs');

var timestamp = require('unix-timestamp');

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
        service: 'Yandex', 
        auth: {
           
            user: 'timofeyshi@yandex.ru',
       pass: "5487tima%"
   }
});

module.exports = function(passport,db){

 var User = require('../models/user')(db);

var confirm = require('../models/confirm')(db);

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'login' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.login = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.role = 0;
                        newUser.valute = 0;
                        newUser.language = 0;
                        newUser.rate = 0;
                        newUser.date = timestamp.now();
                        newUser.medals = [];

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }



                        var conf = new confirm();

                        conf.id =  newUser._id;
                        conf.key = Math.random().toString(36);
                        var textEmail = "<a href='http://localhost:3000/confirm/" + conf.key + "'>Confirm </a>";
                        smtpTransport.sendMail({  //email options
   from: "timofeyshi@yandex.ru", // sender address.  Must be the same as authenticated user if using Gmail.
   to: req.param('email'), // receiver
   subject: "Verify your email adress. Croudfunding app", // subject
   text: textEmail // body
}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});

                            console.log(conf);
                        conf.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }

                            });



                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);

        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}