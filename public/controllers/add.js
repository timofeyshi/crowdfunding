app.controller('addCtrl', 
    function addCtrl($scope,$http,$location,$rootScope,$filter){
     
$scope.messagesh = true;
     

var fileName = "";

       $scope.apple3 = "new apple";
       $scope.parent = {checkOut:""};

    
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
      
      $scope.addProject = function() {

        var parts =$scope.endDate.split('.');
 var mydate = new Date(parts[2],parts[1]-1,parts[0]);

        var data = {
            "title":$scope.title,
            "description":$scope.description,
            "money":$scope.money,
            "endDate":mydate.getTime()/1000,
            "date":Date.now()/1000,
            "image":fileName,
            "valute":"0"
        };
        console.log(data);
        $http.post("/projects", data).then(function success (response) {
                    console.log(response.data);

                });
 
     
      };

    }




);


