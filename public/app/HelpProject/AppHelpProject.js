angular.module('AppHelpProject', ['ui.router','ngResource'])
.config(function($stateProvider) {
  	$stateProvider.state('help', {
        url: '/helpProject/:id',
        templateUrl: 'app/HelpProject/HelpProjectTemplate.html'
    })
});