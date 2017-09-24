angular.module('AppFindProject')
.controller('findCtrl', 
    function findCtrl($scope,$stateParams,FindProjectService){

  		$scope.findProjects = FindProjectService.find($stateParams['word']);

 	});