angular.module('AppProfile', ['ui.router','ngResource'])
.config(function($stateProvider) {

  $stateProvider.state('profile', {
        url: '/profile/:id',
        templateUrl: 'app/Profile/ProfileTemplate.html'
  })

});
