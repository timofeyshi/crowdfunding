app.controller('projectCtrl', 
    function ($scope,$http,$location,$rootScope,$routeParams){

       $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }
    var id =  $routeParams['id'];
    var urlReq = "/projects/" + id;
  
     $http({method:'GET', url: urlReq}).
    then(function success(response) {
            $scope.project =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );




    }




);


