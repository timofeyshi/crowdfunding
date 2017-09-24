angular.module('AppProfile')
.service('ProfileService', function($resource){
	
	var reqUser = $resource('/user/:id');
	var reqUserProject = $resource('/userProjects/:id');
	var reqUserBestProject = $resource("/userProjectsLuck/:id");
	var reqUserFailProject = $resource("/userProjectsFail/:id");

	this.getUser = function(id,func) {
		return reqUser.get({id:id},func);
	}

	this.getUserProjects = function(idProject) {
		return reqUserProject.query({id:idProject});
	}
	
	this.getUserBestProjects = function(idProject) {
		return reqUserBestProject.query({id:idProject});
	}

	this.getUserFailProjects = function(idProject) {
		return reqUserFailProject.query({id:idProject});
	}
});