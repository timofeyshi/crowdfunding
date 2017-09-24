angular.module('AppAddProject')
.service('AddProjectService', function($resource,$http){
    
	var reqAddProject =  $resource('/projects');
	var projectData = {};

	this.setProjectData = function(title,description,money,endDate,image) {
		if (title != undefined && description != undefined && money != undefined && endDate != undefined && image != undefined) {
		var parts = endDate.split('.');
 		var mydate = new Date(parts[2],parts[1]-1,parts[0]);
 		projectData.title = title;
 		projectData.description = description;
 		projectData.money = money;
 		projectData.endDate = mydate.getTime()/1000;
 		projectData.date = Date.now()/1000;
 		projectData.image = image;
 		projectData.valute = 0; 
 		return true;
 	} else {
 		return false;
 	}
	};

	this.addProject = function() {
		return reqAddProject.save(projectData);
	};

    this.addImage = function(files,func) {
    	var fd = new FormData();
        fd.append("file", files[0]);
        $http.post("/upload", fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
        }).then(func);
    }
});