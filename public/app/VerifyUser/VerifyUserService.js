angular.module('AppVerifyUser')
.service('VerifyUserService', function($resource,$http){

	var verifyData = {};
	var reqVerifyUser =  $resource('/verifyMe');

	this.setVerifyData = function(image,text) {
		verifyData.passport = text;
		verifyData.scan = image;
	}

	this.verifyUser = function() {
		return reqVerifyUser.save(verifyData);
	}

});