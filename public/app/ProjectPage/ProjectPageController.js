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
        console.log("text:::::::",text);
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
      var urlRating = "/rating/" + id;

      $scope.goals = ProjectPageService.getGoals($stateParams['id']);

      var projectInfo =  ProjectPageService.getProject(id,function() {
        if (projectInfo.valute == -1) {
              $scope.showTitle = false;
            } else {
              $scope.showTitle = true;
            }
              var userProject = ProjectPageService.getUser($scope.project.owner,function(){
              $scope.payLevel = ProjectPageService.getPayMedal(userProject.medals);
              $scope.commentLevel = ProjectPageService.getCommentMedal(userProject.medals);
              $scope.projectLevel = ProjectPageService.getProjectMedal(userProject.medals);
            }) ;
        $scope.userProject = userProject;
    });

    $scope.project = projectInfo;
    
    $scope.getBackground = function(money,date) {
      
      if (money <= $scope.project.curMoney) {
        return "LightGray";
      } else {
        if (date<Date.now()/1000) {
      return "PeachPuff"
        } else {
        return ""
      }}}

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

    $scope.newsPosts = ProjectPageService.getNews($stateParams['id']);

    var reComments = function() {
      $scope.newComments =  ProjectPageService.getComments($stateParams['id']);
    }
    reComments();
  

    var reRating = function() {
      $http({method:'GET', url: urlRating}).
        then(function success(response) {
          $scope.rating =  response.data;
          $scope.moda = ProjectPageService.mathRate($scope.rating);
          $scope.showVoteForm = ProjectPageService.canVote($rootScope.userInfo,$scope.rating);
        }, function error(response){
      });
    }
    reRating();

    $scope.addStars = function(stars) {
      ProjectPageService.setRating(id,stars);
      ProjectPageService.addRating();
      setTimeout(reRating,500);
    }
    $scope.numberStars = 1;
    });


