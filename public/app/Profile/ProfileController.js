angular.module('AppProfile')
.controller('profileCtrl', 
    function profileCtrl($scope,$http,$location,$rootScope,$stateParams,ProjectPageService){
        var urlProfile = "/user/" + $stateParams['id'];
        var urlBestProjects = "/userProjectsLuck/" + $stateParams['id'];
        var urlProjects = "/userProjects/" +  $stateParams['id'];
        var urlFailProjects = "/userProjectsFail/" +  $stateParams['id'];
       $http({method:'GET', url: urlProfile}).
    then(function success(response) {
            $scope.curUser =  response.data;
             $scope.payLevel = ProjectPageService.getPayMedal($scope.curUser.medals);
               $scope.commentLevel = ProjectPageService.getCommentMedal($scope.curUser.medals);
                $scope.projectLevel = ProjectPageService.getProjectMedal($scope.curUser.medals);
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
         $http({method:'GET', url: urlProjects}).
    then(function success(response) {
            $scope.curProjects =  response.data;
            
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
     $http({method:'GET', url: urlBestProjects}).
    then(function success(response) {
            $scope.bestProjects =  response.data;
            
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
     $http({method:'GET', url: urlFailProjects}).
    then(function success(response) {
            $scope.failProjects =  response.data;
            
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
   
    }




);


