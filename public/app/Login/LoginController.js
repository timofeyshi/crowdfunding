angular.module('AppLogin')
        .controller('signinCtrl', 
    function signinCtrl($scope,$location,$rootScope,$resource,LoginService,AppService){
      $scope.otvet = false;
          
      $scope.login= function (email,pass){
        LoginService.setUserData(email,pass);
        var response= LoginService.LogIn(function() {
          if (response[0] === 'n') {
            $scope.otvet = true;
          } 
          if (response[0] === 'h') {
            $rootScope.userIn = true;
            $scope.reLang();
            $scope.reColor();
            AppService.setIn();
            $location.path("/");
          }
        });
      }
  });