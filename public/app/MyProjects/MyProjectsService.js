angular.module('AppMyProjects')
.service('MyProjectsService', function($resource){
    var reqAddNew =  $resource('/news');
    var reqAddTarget = $resource('/targets');
    var reqMyProjects = $resource('/myProjects');
    var reqDelete = $resource('/projects/:id');
    var newPost = {};
    var newTarget = {};

    this.setNewData = function(id,title,description) {
      newPost.id = id;
      newPost.title = title;
      newPost.text = description;
      newPost.date = Date.now()/1000;
    }
   
    this.addNew = function() {
      return reqAddNew.save(newPost);
    }

    this.setTargetData = function(id,title,text,money,date) {
      var parts =date.split('.');
      var mydate = new Date(parts[2],parts[1]-1,parts[0]);
      newTarget.idProject = id;
      newTarget.title = title;
      newTarget.text = text;
      newTarget.sum = money;
      newTarget.date = mydate.getTime()/1000;
    }

    this.addTarget = function() {
      return reqAddTarget.save(newTarget);
    }

    this.getMyProjects = function(func) {
      return reqMyProjects.query(func);
    }

    this.deleteProject = function(idProject) {
      return reqDelete.delete({ id: idProject });
    }
    
    this.getDays = function(days) {
      if (days>=1) {
        return days;
      } else {
        return 0;
      }
    }
});