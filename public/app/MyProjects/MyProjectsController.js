angular.module('AppMyProjects')
.controller('projCtrl', 
    function projCtrl($scope,$location,$rootScope,MyProjectsService){
       
       $scope.idAdded = 0;
       $scope.addNewsBool = true;
        $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
      };
      $scope.clickPlus = function(id) {
        $scope.idAdded = id;

      }

      $scope.addNew = function(title,description) 
      {
        MyProjectsService.setNewData($scope.idAdded,title,description);
        MyProjectsService.addNew();
      }

      $scope.addTarget = function(title,text,money,date) {
       MyProjectsService.setTargetData($scope.idAdded,title,text,money,date);
       MyProjectsService.addTarget();
      }
      
      $scope.delete = function(id) {
        MyProjectsService.deleteProject(id);
        $scope.myProjects = MyProjectsService.getMyProjects();
       }

      $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }

    $scope.myProjects = MyProjectsService.getMyProjects();


    }




)