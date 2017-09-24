angular.module('AppFindProject')
.service('FindProjectService', function($resource){

	this.find = function(text) {
		var urlProject = "/search?word="+ text;
		var reqProjects = $resource(urlProject);
		return reqProjects.query();
	}

});