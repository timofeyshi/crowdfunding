angular.module('AppProjectPage')
.service('ProjectPageService', function($resource,$http){
   	var reqAddComment =  $resource('/comments');

   	var commentData = {};
   	var ratingData = {};
   	var reqProject = $resource('/projects/:id');
   	var reqNews = $resource('/news/:id');
    var reqUser = $resource('/user/:id');
   	var reqRating = $resource('/rating');
    var reqComments = $resource('/comments/:id');
    var reqGoals = $resource('/targets/:id');
    var reqGetRating = $resource('/rating/:id');

    this.mathRate = function(rate) {
      var moda = 0;
      var numMod = 0;
      for (it in rate) {
          moda += rate[it].rate;
          numMod += 1;
      }
      if (numMod != 0) {
        moda = moda / numMod;
      } else {
        moda = 1;
      }
      return moda;
    }

    this.getRating = function(idProject) {
      var urlRating = "/rating/" + idProject;
      $http({method:'GET', url: urlRating})
        .then(function success(response) {
           
            return response.data; 
        }, function error(response){
            });
    }

    this.canVote = function(user,rate) {
      var canVote = true;
      var userId;
      if (user) {
        userId = user._id;
      } else {
        canVote = false;
      }
              
      for (it in rate) {
        if (rate[it].idUser == userId ) {
            canVote = false;
        }
      }
      return canVote;
    }

    this.getGoals = function(idProject) {
      return reqGoals.query({id:idProject});
    }

    this.getComments = function(idProject) {
      return reqComments.query({id:idProject});
    }

   	this.setComment = function(id,text) {
   		commentData.idProject = id;
   		commentData.text = text;
   		commentData.date = Date.now()/1000;
   	}
   	 this.addComment = function() {
       return reqAddComment.save(commentData);
    }
    this.getProject = function(idProject,func) {
    	 return reqProject.get({ id: idProject },func);
    }
    this.getNews = function(idProject) {
    	return reqNews.query({id:idProject});
    }
  	this.setRating = function(id,stars) {
  		ratingData.idProject = id;
  		ratingData.rate = stars;
  	}
  	this.addRating = function() {
  		return reqRating.save(ratingData);
  	}
    this.getUser = function(idProject,func) {
      return reqUser.get({id:idProject},func);
    }

    this.getPayMedal = function(mass) {
      if (mass.indexOf(3) != -1) {
        return 3;
      }
      if (mass.indexOf(2) != -1) {
        return 2;
      }
      if (mass.indexOf(1) != -1) {
        return 1;
      }
      return false;
    }

     this.getCommentMedal = function(mass) {
      if (mass.indexOf(4) != -1) {
        return 1;
      }
      
      return false;
    }
    this.getProjectMedal = function(mass) {
      if (mass.indexOf(5) != -1) {
        return 1;
      }
      
      return false;
    }
});