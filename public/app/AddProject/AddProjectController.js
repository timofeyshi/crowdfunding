angular.module('AppAddProject')
.controller('addCtrl', 
    function addCtrl($scope,$http,$location,$rootScope,$filter,AddProjectService){
     
	$scope.messagesh = true;
    $scope.showError = false;

	var fileName;

      
       $scope.parent = {checkOut:""};

    
       $scope.uploadFile = function(files) {
    AddProjectService.addImage(files, function success (response) {
                    fileName = response.data;
                    $scope.message = "image at server";
                    $scope.messagesh = false;
                });

};
      
      $scope.addProject = function() {

		if (AddProjectService.setProjectData($scope.title,$scope.description,$scope.money,$scope.endDate,fileName)) {
    	AddProjectService.addProject();

       	$location.url("/projects");
 		} else {
 			$scope.showError = true;
 		}
     
      };

    }




);


