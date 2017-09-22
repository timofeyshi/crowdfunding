angular.module('AppProjectPage', ['ui.router','ngResource'])

.config(function($stateProvider) {
  $stateProvider.state('projectPage', {
             url: '/project/:id',
            templateUrl: 'app/ProjectPage/ProjectPageTemplate.html'
        })
});