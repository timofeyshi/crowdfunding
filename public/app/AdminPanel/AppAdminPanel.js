angular.module('AppAdminPanel', ['ui.router','ngResource'])
.config(function($stateProvider) {
  	$stateProvider.state('adminPanel', {
        url: '/adminPanel',
        templateUrl: 'app/AdminPanel/AdminPanelTemplate.html'
    })
});