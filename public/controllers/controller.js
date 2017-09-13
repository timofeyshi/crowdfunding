var app = angular.module('RoutingApp', ['ngRoute']);
app.run(function($rootScope) {

$rootScope.isIn = false;


});


  app.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/index.html'
  })
  .when('/signin', {
    templateUrl: 'views/signin.html',
            controller:'signinCtrl'
  })
.when('/register', {
    templateUrl: 'views/register.html',
            controller:'signupCtrl'
  })
.when('/panel', {
    templateUrl: 'views/settings.html'
  })
.when('/projects', {
    templateUrl: 'views/panel.html',
            controller:'projCtrl'
  })
.when('/add', {
    templateUrl: 'views/add.html',
     controller:'addCtrl'
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

app.controller('mainCtrl', 
    function mainCtrl($scope,$http,$rootScope){


    	$http({method:'GET', url: '/give'}).
    then(function success(response) {
    		if (response.data == "noooo") {
    			$rootScope.userIn = false;
    	
    		} else {
    			$rootScope.userIn = true;
    		$rootScope.userInfo = response.data;
    		}
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });
    	
    	



    	$scope.$watch('userIn', function(newValue,oldValue,scope) {
    		if (newValue === true) {
    			$http({method:'GET', url: '/give'}).
    then(function success(response) {
    		$rootScope.userInfo = response.data;
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    }
);
    		}

    	}) 

    }
   
  

)