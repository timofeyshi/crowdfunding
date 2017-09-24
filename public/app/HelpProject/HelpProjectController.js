angular.module('AppHelpProject')
.controller('helpCtrl', 
    function helpCtrl($scope,$http,$location,$rootScope,$stateParams,HelpProjectService){

      $scope.addPayment = function(money) {
        var redirectUrl = "/project/" + $stateParams['id'];
        HelpProjectService.helpProject($stateParams['id'],money);
        $location.path(redirectUrl);
      }
});