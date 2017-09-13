app.controller('projCtrl', 
    function projCtrl($scope,$http,$location,$rootScope){
       $scope.apple2 = "new apple";

       $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }

    $http({method:'GET', url: '/myProjects'}).
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


    }




)