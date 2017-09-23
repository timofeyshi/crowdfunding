angular.module('AppProjectPage')
.controller('projectCtrl', 
    function ($scope,$http,$location,$rootScope,$stateParams,ProjectPageService){
      $scope.news=false;
      $scope.comments = false;
      $scope.about = true;

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
       

        ProjectPageService.setComment($stateParams['id'],text);
        ProjectPageService.addComment();
        setTimeout(reComments,500);
        
         $scope.textComment = '';

      }

       $scope.rnd = function(inVar) {
        return Math.round(inVar)+1;
       }
       $scope.rndNorm = function(inVar) {
        return Math.round(inVar);
       }
    var id =  $stateParams['id'];
    var urlReq = "/projects/" + id;
    var urlNews = "/news/" + id;
    var urlComment = "/comments/" + id;
    var urlRating = "/rating/" + id;
     var urlGoals = "/targets/" + id;
     $http({method:'GET', url: urlGoals}).
    then(function success(response) {
            $scope.goals =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
    
    var projectInfo =  ProjectPageService.getProject(id,function() {

      console.log("prj info",projectInfo.owner);
      if (projectInfo.valute == -1) {
              $scope.showTitle = false;
            } else {
              $scope.showTitle = true;
            }
            var userProject = ProjectPageService.getUser($scope.project.owner,function(){
              $scope.payLevel = ProjectPageService.getPayMedal(userProject.medals);
               $scope.commentLevel = ProjectPageService.getCommentMedal(userProject.medals);
                $scope.projectLevel = ProjectPageService.getProjectMedal(userProject.medals);
            });
             $scope.userProject = userProject;
    });
    $scope.project = projectInfo;
    console.log($scope.project);
    

            

     $scope.getBackground = function(money,date) {
      console.log($scope.project.curMoney);
      if (money <= $scope.project.curMoney) {
        return "LightGray";
      } else {
        if (date<Date.now()/1000) {
      return "PeachPuff"
        } else {
        return ""
      }
      }
      
      
    };


    $scope.getAchieved = function(moneyGoal) {
      if (moneyGoal<=$scope.project.curMoney) {
        return true;
      } else {
        return false;
      }
     return false;
    };

    $scope.getWarning = function(money,date) {
       if (money <= $scope.project.curMoney) {
        return false;
      } else {
       if (date<Date.now()/1000) {
      return true;
        } else {
        return false;
      }
    }
    }

    console.log(urlNews);
     $http({method:'GET', url: urlNews}).
    then(function success(response) {
            $scope.newsPosts =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );

    var reComments = function() {
      var id =  $stateParams['id'];
      var urlComment = "/comments/" + id;
       $http({method:'GET', url: urlComment}).
    then(function success(response) {
            $scope.newComments =  response.data;
    }, function error(response){
            console.log("Возникла ошибка");
    }
  );
    }
 reComments();
   $scope.newComments = ProjectPageService.getNews(id);

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
        ProjectPageService.setRating(id,stars);
        ProjectPageService.addRating();
        setTimeout(reRating,500);
       
         
      }
        $scope.numberStars = 1;

        

    }




);


