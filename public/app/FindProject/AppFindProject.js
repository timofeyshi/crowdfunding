angular.module('AppFindProject', ['ui.router','ngResource'])
.config(function($stateProvider) {

  $stateProvider.state('find', {
        url: '/find/:word',
        templateUrl: 'app/FindProject/FindProjectTemplate.html'
  });

});