app.controller('addCtrl', 
    function addCtrl($scope,$http,$location,$rootScope,$filter){
       $scope.apple3 = "new apple";
       $scope.parent = {checkOut:""};

    

      
      $scope.addProject = function() {

        var parts =$scope.endDate.split('.');
 var mydate = new Date(parts[2],parts[1]-1,parts[0]);

        var data = {
            "title":$scope.title,
            "description":$scope.description,
            "money":$scope.money,
            "endDate":mydate.getTime()/1000,
            "date":Date.now()/1000,
            "image":"vk.com"
        };
        console.log(data);
        $http.post("/projects", data).then(function success (response) {
                    console.log(response.data);
                });
 
     
      };

    }




);
