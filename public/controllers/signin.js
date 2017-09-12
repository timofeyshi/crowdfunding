app.controller('signinCtrl', 
    function signinCtrl($scope,$http,$location,$rootScope){
         $scope.otvet = false;
        
     $scope.login= function (email,pass){
       
        var data = {
            "username": email,
            "password": pass
        };
        console.log(data);
       
        $http.post("/login", data).then(function success (response) {
                    if (response.data === "noooo") 
                     {

                        $scope.otvet = true;
                     } else {
                         $rootScope.userIn = true;
                        $location.path("/");

                     }
                });
    };



    $scope.check  = function () {
     $http({method:'GET', url: '/give'}).
    then(function success(response) {
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    }
);
    }
       
    }

)