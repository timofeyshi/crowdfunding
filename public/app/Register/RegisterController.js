angular.module('AppRegister')
.controller('signupCtrl', 
    function signupCtrl($scope,$location,$rootScope,RegisterService){

    $scope.otvet = false;
    $scope.signup = function(email,username,pass)  {
    if(RegisterService.setUserData(email,username,pass)) {
    var response= RegisterService.SignUp(function() {
        if (response[0] === 'n') {
            $scope.otvet = true;
      } 
      if (response[0] === 'h') {
           $rootScope.userIn = true;
                        $location.path("/");
      }
       });   

       } else {
       	$scope.otvet = true;

       }     
       }    
       }
    

)