angular.module('AppAddProject', ['ui.router','ngResource'])

.config(function($stateProvider) {
  $stateProvider.state('add', {
            url: '/add',
            templateUrl: 'app/AddProject/AddProjectTemplate.html'
        })
});