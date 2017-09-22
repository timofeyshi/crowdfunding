angular.module('AppAllProjects')
.service('AllProjectsService', function($resource,$http){
    var reqPages =  $resource('/getPages');
    this.getAllProjects = function(page) {
         var urlPro = '/projects?page=' +  page;
         var reqAllProjects =  $resource(urlPro);
         return reqAllProjects.query();
    }

    this.getPages = function(func) {
        reqPages.get({},func)
    }
});