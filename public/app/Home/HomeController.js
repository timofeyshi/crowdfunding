angular.module('AppHome')
.controller('indexCtrl', 
    function indexCtrl($scope,$http,$location,$rootScope,HomeService){
		$scope.rnd = function(inVar) {
        	return HomeService.round(inVar); 
       	}
 
		$scope.allNews = HomeService.getAllNews();
      	$scope.bestProjects = HomeService.getBestProjects();
      	$scope.myProjects = HomeService.getAllProjects();
    });