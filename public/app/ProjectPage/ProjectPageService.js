angular.module('AppProjectPage')
.service('ProjectPageService', function($resource){
   	var reqAddComment =  $resource('/comments');

   	var commentData = {};
   	var ratingData = {};
   	var reqProject = $resource('/projects/:id');
   	var reqNews = $resource('/news/:id');
   	var reqRating = $resource('/rating');

   	this.setComment = function(id,text) {
   		commentData.idProject = id;
   		commentData.text = text;
   		commentData.date = Date.now()/1000;
   	}
   	 this.addComment = function() {
       return reqAddComment.save(commentData);
    }
    this.getProject = function(idProject) {
    	 return reqProject.get({ id: idProject });
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
  
});