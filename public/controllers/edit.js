app.controller('editCtrl', 
    function editCtrl($scope,$http,$location,$rootScope,$routeParams){
     
     var id =  $routeParams['id'];
      var urlReq = "/projectsMark/" + id;
        $scope.editProject = function() {

        var parts =$scope.endDate.split('.');
 var mydate = new Date(parts[2],parts[1]-1,parts[0]);

        var data = {
            "title":$scope.title,
            "description":$scope.description,
            "money":$scope.money,
            "endDate":mydate.getTime()/1000,
            "date":Date.now()/1000,
            "image":$scope.fileName,
            "valute":0
        };
        console.log(data);
        var urlPut = "/projects/" + id;
        $http.put(urlPut, data).then(function success (response) {
                    console.log(response.data);

                });
 
     
      };

     $http({method:'GET', url: urlReq}).
    then(function success(response) {
         console.log(response.data.title);

         $scope.title = response.data.title;
         $scope.money = response.data.money;
         $scope.description = response.data.description;
         var date = new Date(response.data.endDate * 1000);
         if (date.getMonth()<9) {
            var edDate = "0" + (date.getMonth()+1);
         } else {
             var edDate =  date.getMonth()+1;
         }

          if (date.getDate()<10) {
            var day = "0" + date.getDate();
         } else {
             var day =  date.getDate();
         }
         $scope.endDate = day + '.' + edDate + '.' + date.getFullYear();
         $scope.fileName = response.data.image;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
    
   
    }




);


