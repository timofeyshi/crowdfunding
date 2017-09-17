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
       $scope.rndNorm = function(inVar) {
        return Math.round(inVar);
       }
    var id =  $routeParams['id'];
    var urlReq = "/projects/" + id;
    var urlNews = "/news/" + id;
    var urlComment = "/comments/" + id;
    var urlRating = "/rating/" + id;
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


var reRating = function() {
  console.log("reRating");
       $http({method:'GET', url: urlRating}).
    then(function success(response) {
              $scope.rating =  response.data;
              console.log(response.data);
              var userId = 0;
              var canVote = true;
              var moda = 0;
              var numMod = 0;
               for (it in $scope.rating) {
                  moda += $scope.rating[it].rate;
                  numMod += 1;
              }
              if (numMod != 0) {
              moda = moda / numMod;} else {
                moda = 1;
              }
              $scope.moda = moda;
              if ($rootScope.userInfo) {
                  userId = $rootScope.userInfo._id;
              } else {
                canVote = false;
              }
              
              for (it in $scope.rating) {
                  if ($scope.rating[it].idUser == userId ) {
                    canVote = false;
                  }
              }
                console.log(canVote);
                $scope.showVoteForm = canVote;

    }, function error(response){
            console.log("Возникла ошибка");
    }
  );

}
reRating();

      $scope.addStars = function(stars) {
        console.log(stars);
        
        var newPost = {
            idProject:$routeParams['id'],
            
            rate:stars

        }

        console.log(newPost);
         $http.post("/rating", newPost).then(function success (response) {
                    console.log(response.data);
                    reRating();
                });
         
      }
        $scope.numberStars = 1;

        

    }




);


