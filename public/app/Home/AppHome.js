angular.module('AppHome', ['ui.router','ngResource'])

.config(function($stateProvider) {
  $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/Home/HomeTemplate.html'
        })
});