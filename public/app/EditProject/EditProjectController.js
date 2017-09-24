angular.module('AppEditProject')
.controller('editCtrl', 
    function editCtrl($scope,$http,$location,$rootScope,$stateParams,EditProjectService){
    
        $scope.editProject = function() {
            EditProjectService.setProjectData($scope.title,$scope.description,$scope.money,$scope.endDate,$scope.fileName);
            EditProjectService.editProject($stateParams['id']);
            $location.url("/projects");
    };

        var projectInfo = EditProjectService.getProject($stateParams['id'],function() {
            $scope.title = projectInfo.title;
            $scope.money = projectInfo.money;
            $scope.description = projectInfo.description;
            $scope.endDate = EditProjectService.restructDate(projectInfo.endDate);
            $scope.fileName = projectInfo.image;
    });

});


