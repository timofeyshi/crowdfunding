angular.module('AppFindProject')
.controller('findCtrl', 
    function findCtrl($scope,$http,$location,$rootScope,$stateParams,FindProjectService){
    
  $scope.findProjects = FindProjectService.find($stateParams['word']);
    }




)