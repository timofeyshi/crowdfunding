app.controller('indexCtrl', 
    function indexCtrl($scope,$http,$location,$rootScope){

       $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }
      
      $http({method:'GET', url: '/newProjects'}).
    then(function success(response) {
            if (response.data == "noooo") {
              $scope.messagePro = "you can't see"
        
            } else {
              $scope.myProjects = response.data.slice(0,4);
            }
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });


    }




)