angular.module('AppHelpProject')
.controller('helpCtrl', 
    function helpCtrl($scope,$http,$location,$rootScope,$stateParams){
    $scope.addPayment = function(money) {
     
      var id =  $stateParams['id'];
      var urlPay = "/pay/"+id + "/" + money;
      console.log(urlPay);
      var redirectUrl = "/project/" + id;
      console.log(redirectUrl);
       $http.get(urlPay).then(function success (response) {
                    console.log(response.data);
                      $location.path(redirectUrl);
                });
     
    }
    }




)