angular.module('AppVerifyUser')
.controller('verifyCtrl', 
    function verifyCtrl($scope,$http,$location,$rootScope,AddProjectService,VerifyUserService){

    $scope.messagesh = true;
    var fileName;

    $scope.uploadFile = function(files) {
        AddProjectService.addImage(files, function success (response) {
            fileName = response.data;
            $scope.message = "image at server";
            $scope.messagesh = false;
        });
    }

    $scope.verifyMe = function() {
        VerifyUserService.setVerifyData(fileName,$scope.description);
        VerifyUserService.verifyUser();
        $location.url("/panel");
    }

});