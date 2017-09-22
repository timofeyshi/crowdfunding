angular.module('AppHome')
.service('HomeService', function($resource){
    var reqAllNews =  $resource('/allNews');
     var reqAllProjects =  $resource('/newProjects');
      var reqBestProjects =  $resource('/bestProjects');
    this.round = function(integer) {
      return  Math.round(integer)+1;
    }
 	this.getAllNews = function() {
 		return reqAllNews.query();
 	};
    this.getAllProjects = function() {
        return reqAllProjects.query();
    };
    this.getBestProjects = function() {
        return reqBestProjects.query();
    }
    
});