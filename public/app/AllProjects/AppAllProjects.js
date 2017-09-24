angular.module('AppAllProjects', ['ui.router','ngResource'])
.config(function($stateProvider) {
  	$stateProvider.state('all', {
        url: '/all/:id',
        templateUrl: 'app/AllProjects/AllProjectsTemplate.html'
    })
});