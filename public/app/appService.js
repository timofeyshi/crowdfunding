angular.module('RoutingApp')
.service('AppService', function($resource,$http,$location){
	var isIn = false;

	this.setIn = function() {
		isIn = true;
	}

	this.setOut = function() {
		isIn = false;
	}

	this.getIn = function() {
		return isIn;
	}

	this.canI = function() {
		if (!isIn) {
			$location.path("/");
		}
	}


});	