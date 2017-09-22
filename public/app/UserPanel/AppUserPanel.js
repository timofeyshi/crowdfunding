angular.module('AppUserPanel', ['ui.router','ngResource'])

.config(function($stateProvider) {
  $stateProvider.state('panel', {
            url: '/panel',
            templateUrl: 'app/UserPanel/UserPanelTemplate.html'
        })
});