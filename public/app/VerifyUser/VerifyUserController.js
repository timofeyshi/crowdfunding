angular.module('AppVerifyUser')
.controller('verifyCtrl', 
    function verifyCtrl($scope,$http,$location,$rootScope){
      $scope.messagesh = true;
      var fileName;
         $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);
console.log(fd);
    $http.post("/upload", fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).then(function success (response) {
                    fileName = response.data;
                    console.log(response.data);
                    $scope.message = "image at server";
                    $scope.messagesh = false;
                });

};



    $scope.verifyMe = function() {
        var data = {
            "passport":$scope.description,
            "scan":fileName
           
        };
        console.log(data);
        $http.post("/verifyMe", data).then(function success (response) {
                    console.log(response.data);

                });
    }


    }




)