angular.module('AppProfile')
.controller('profileCtrl', 
    function profileCtrl($scope,$http,$location,$rootScope,$stateParams,ProjectPageService,ProfileService,AdminPanelService){
    
    var curUser = ProfileService.getUser($stateParams['id'],function() {
    	$scope.curUser =  curUser;
    	$scope.payLevel = ProjectPageService.getPayMedal($scope.curUser.medals);
        $scope.commentLevel = ProjectPageService.getCommentMedal($scope.curUser.medals);
        $scope.projectLevel = ProjectPageService.getProjectMedal($scope.curUser.medals);
    });
        
    $scope.curProjects = ProfileService.getUserProjects($stateParams['id']);
   	$scope.bestProjects = ProfileService.getUserBestProjects($stateParams['id']);
    $scope.failProjects = ProfileService.getUserFailProjects($stateParams['id']);
    $scope.getStatus = function(status) {
            return AdminPanelService.getStatus(status);
    }

    
    });


