app.controller('signupCtrl', 
    function signupCtrl($scope,$http,$location,$rootScope){

    $scope.otvet = false;
       $scope.signup = function(email,username,pass) {
             var data = {
                "email":email,
                "username":username,
                "password":pass
            };

            console.log(data);
              $http.post("/signup", data).then(function success (response) {
                    if (response.data === "noooo") 
                     {
                        $scope.otvet = true;
                     } else {
                        
                         $rootScope.userIn = true;
                        $location.path("/");
                     }
                });
       }
    }

)