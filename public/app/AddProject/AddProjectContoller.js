angular.module('AppAddProject')
.controller('addCtrl', 
    function addCtrl($scope,$http,$location,$rootScope,$filter,AddProjectService){
     
$scope.messagesh = true;
     

var fileName = "";

       $scope.apple3 = "new apple";
       $scope.parent = {checkOut:""};

    
       $scope.uploadFile = function(files) {
    AddProjectService.AddImage(files, function success (response) {
                    fileName = response.data;
                    $scope.message = "image at server";
                    $scope.messagesh = false;
                });

};
      
      $scope.addProject = function() {

		AddProjectService.setProjectData($scope.title,$scope.description,$scope.money,$scope.endDate,fileName);
     	AddProjectService.addProject();
     	console.log("dobailoc");
       	$location.url("/projects");
 
     
      };

    }




);


