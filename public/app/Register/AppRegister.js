angular.module('AppRegister', ['ui.router','ngResource'])

.config(function($stateProvider) {
  $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'app/Register/RegisterTemplate.html'
        })
});