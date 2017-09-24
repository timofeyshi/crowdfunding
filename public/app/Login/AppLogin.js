angular.module('AppLogin', ['ui.router','ngResource'])
.config(function($stateProvider) {
  	$stateProvider.state('signin', {
        url: '/signin',
        templateUrl: 'app/Login/LoginTemplate.html'
    })
});