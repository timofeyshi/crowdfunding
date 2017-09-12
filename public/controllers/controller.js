angular.module('RoutingApp', ['ngRoute'])
  .config( ['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/index.html'
  })
  .when('/signin', {
    templateUrl: 'views/signin.html'
  })
.when('/register', {
    templateUrl: 'views/register.html'
  })
.when('/panel', {
    templateUrl: 'views/settings.html'
  })
.when('/projects', {
    templateUrl: 'views/panel.html'
  })
.when('/add', {
    templateUrl: 'views/add.html'
  })
.when('/all', {
    templateUrl: 'views/projects.html'
  })
.when('/project', {
    templateUrl: 'views/index2.html'
  })

  .otherwise({
    redirectTo: '/'
  });
}]);