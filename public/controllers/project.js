app.controller('projectCtrl', 
    function ($scope,$http,$location,$rootScope,$routeParams){
      $scope.news=false;


      $scope.showNews = function() {
        $scope.news = true;
      }

      $scope.showAbout = function() {
        $scope.news = false;
      }
       $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }
    var id =  $routeParams['id'];
    var urlReq = "/projects/" + id;
    var urlNews = "/news/" + id;
     $http({method:'GET', url: urlReq}).
    then(function success(response) {
            $scope.project =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
    console.log(urlNews);
     $http({method:'GET', url: urlNews}).
    then(function success(response) {
            $scope.newsPosts =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );


    }




);


