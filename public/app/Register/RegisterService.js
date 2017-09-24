angular.module('AppRegister')
.service('RegisterService', function($resource){
    var reqLogin =  $resource('/signup');
    var userData = {};

    this.setUserData = function(email,username,pass) {
    	if (email != undefined && username != undefined && pass != undefined) {
    	   userData.email = email;
    	   userData.username = username;
    	   userData.password = pass;
    	   return true;
        } else {
    	   return false;
        }
    };

 	this.SignUp = function(func) {
 		return reqLogin.save(userData, func);
 	};
    
});