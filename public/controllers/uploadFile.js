angular.module('uploadFileService',[])

.service('uploadFile', function($http) {
	this.upload = function(file) {
		var fd = new FormData();
		fd.append('myfile', file.upload);
		console.log('upp');
		return $http.post('/upload', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type' : undefined}
		});
	};


});