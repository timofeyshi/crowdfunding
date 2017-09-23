angular.module('AppProjectPage')
.service('ProjectPageService', function($resource){
   	var reqAddComment =  $resource('/comments');

   	var commentData = {};
   	var ratingData = {};
   	var reqProject = $resource('/projects/:id');
   	var reqNews = $resource('/news/:id');
    var reqUser = $resource('/user/:id');
   	var reqRating = $resource('/rating');

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