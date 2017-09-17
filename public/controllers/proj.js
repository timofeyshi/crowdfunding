app.controller('projCtrl', 
    function projCtrl($scope,$http,$location,$rootScope){
       $scope.apple2 = "new apple";
       $scope.idAdded = 0;
        $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
   };
      $scope.clickPlus = function(id) {
        $scope.idAdded = id;

      }
      $scope.addNew = function(title,description) 
      {
        var newPost = {
            id:$scope.idAdded,
            title:title,
            text:description,
            date:Date.now()/1000

        }

        console.log(newPost);
         $http.post("/news", newPost).then(function success (response) {
                    console.log(response.data);

                });
      }





       var reread = function() {
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


       };


       $scope.delete = function(id) {
        

        var delteUrl = "/projects/" + id;

         $http.delete(delteUrl).then(function success (response) {
                    console.log(response.data);

                });
 
     reread();     
        console.log(delteUrl);

       }


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