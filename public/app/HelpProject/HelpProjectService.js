angular.module('AppHelpProject')
.service('HelpProjectService', function($resource,$http){

	var reqHelpProject =  $resource('/pay/:id/:money');

	this.helpProject = function(id,money) {
		return reqHelpProject.get({id:id,money:money});
	}
	
});