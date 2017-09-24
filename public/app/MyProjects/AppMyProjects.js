angular.module('AppMyProjects', ['ui.router','ngResource'])
.config(function($stateProvider) {
  	$stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'app/MyProjects/MyProjectsTemplate.html'
    });
});