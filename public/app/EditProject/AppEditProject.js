angular.module('AppEditProject', ['ui.router','ngResource'])

.config(function($stateProvider) {
  $stateProvider.state('editProject', {
            url: '/edit/:id',
            templateUrl: 'app/editProject/EditProjectTemplate.html'
        })
});