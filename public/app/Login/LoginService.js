angular.module('AppLogin')
.service('LoginService', function($resource){
    var reqLogin =  $resource('/login');

    var userData = {};

    this.setUserData = function(email,pass) {
    	userData.username = email;
    	userData.password = pass;
    };

 	this.LogIn = function(func) {
 		return reqLogin.save(userData, func);
 	};
    
});