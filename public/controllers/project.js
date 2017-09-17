app.controller('projectCtrl', 
    function ($scope,$http,$location,$rootScope,$routeParams){
      $scope.news=false;
      $scope.comments = false;
      $scope.about = false;
      $scope.showComments = function() {
        $scope.comments = true;
        $scope.about = false;
        $scope.news = false;
      }

      $scope.showNews = function() {
        $scope.comments = false;
        $scope.about = false;
        $scope.news = true;
      }

      $scope.showAbout = function() {
      $scope.comments = false;
        $scope.about = true;
        $scope.news = false;
      }

   
      $scope.addComment = function(text) {
        var newPost = {
            idProject:$routeParams['id'],
            text:text,
            date:Date.now()/1000

        }

        console.log(newPost);
         $http.post("/comments", newPost).then(function success (response) {
                    console.log(response.data);
                    reComments();
                });
         $scope.textComment = '';

      }

       $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }
    var id =  $routeParams['id'];
    var urlReq = "/projects/" + id;
    var urlNews = "/news/" + id;
    var urlComment = "/comments/" + id;
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

    var reComments = function() {
      var id =  $routeParams['id'];
      var urlComment = "/comments/" + id;
       $http({method:'GET', url: urlComment}).
    then(function success(response) {
            $scope.newComments =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
    }

     $http({method:'GET', url: urlComment}).
    then(function success(response) {
            $scope.newComments =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );

    }




);


