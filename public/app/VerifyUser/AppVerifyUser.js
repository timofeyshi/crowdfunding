angular.module('AppVerifyUser', ['ui.router','ngResource'])
.config(function($stateProvider) {
  $stateProvider.state('verify', {
        url: '/verify',
        templateUrl: 'app/VerifyUser/VerifyUserTemplate.html'
  })

});