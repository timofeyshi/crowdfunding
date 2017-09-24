angular.module('AppEditProject')
.service('EditProjectService', function($resource,$http){

    var reqEditProject =  $resource('/projectsMark/:id');
    var reqEdit = $resource('/projects');
    var editData = {};

    this.setProjectData = function(title,description,money,endDate,image) {
        var parts =endDate.split('.');
        var mydate = new Date(parts[2],parts[1]-1,parts[0]);
        editData.title = title;
        editData.description = description;
        editData.money = money;
        editData.endDate = mydate.getTime()/1000;
        editData.date = Date.now()/1000;
        editData.image = image;
        editData.valute = 0;
    }

    this.editProject = function(id) {
        var urlPut = "/projects/" + id;
        $http.put(urlPut, editData).then(function success (response) {
        });
    }

    this.restructDate = function(dateOld) {

        var date = new Date(dateOld * 1000);
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
        var okDate = day + '.' + edDate + '.' + date.getFullYear();

        return okDate;
    }

    this.getProject = function(id,func) {
        return reqEditProject.get({id:id},func);
    }

});