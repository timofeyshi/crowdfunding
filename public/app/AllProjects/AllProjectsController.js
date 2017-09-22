angular.module('AppAddProject')
.controller('allProjectsCtrl', 
    function allProjectsCtrl($scope,$http,$location,$rootScope,$stateParams,AllProjectsService){
$scope.numbers = [];
  $scope.rnd = function(inVar) {
        return Math.trunc(inVar)+1;
       }
     $scope.myProjects = AllProjectsService.getAllProjects($stateParams['id']);
      $scope.page = AllProjectsService.getPages(function(user) {
      	console.log(user.length);
      	 for (var i = 0; i<$scope.rnd((user.length)/8);i++) {
      $scope.numbers.push({"page":i+1});
    }
    console.log($scope.numbers);
      });
      



    


    }




)