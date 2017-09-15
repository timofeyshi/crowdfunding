app.controller('allProjectsCtrl', 
    function allProjectsCtrl($scope,$http,$location,$rootScope,$routeParams){

  $scope.rnd = function(inVar) {
        return Math.trunc(inVar)+1;
       }
      var id =  $routeParams['id'];
      var urlPro = '/projects?page=' +  id;
      console.log(urlPro);
       $http({method:'GET', url: urlPro}).
    then(function success(response) {
            if (response.data == "noooo") {
              $scope.messagePro = "you can't see"
        
            } else {
              $scope.myProjects = response.data;
            }
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });

    $http({method:'GET', url: "/getPages"}).
    then(function success(response) {
            if (response.data == "noooo") {
              $scope.messagePro = "you can't see"
        
            } else {
              $scope.page = response.data;
              for (var i = 0; i<$scope.rnd(($scope.page.length)/8);i++) {
      $scope.numbers.push({"page":i+1});
    }

            }
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });

    $scope.numbers = [];
    


    }




)