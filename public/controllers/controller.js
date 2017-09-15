var app = angular.module('RoutingApp', ['ngRoute','ngSanitize']);
app.run(function($rootScope) {

$rootScope.isIn = false;


});


  app.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/index.html',
     controller:'indexCtrl'
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
    templateUrl: 'views/settings.html',
    controller:'panelCtrl'
  })
.when('/projects', {
    templateUrl: 'views/panel.html',
            controller:'projCtrl'
  })
.when('/add', {
    templateUrl: 'views/add.html',
     controller:'addCtrl'
  })
.when('/all/:id', {
    templateUrl: 'views/projects.html',
    controller:'allProjectsCtrl'
  })
.when('/project/:id', {
    templateUrl: 'views/index2.html',
            controller:'projectCtrl'
  })
.when('/edit/:id', {
    templateUrl: 'views/edit.html',
            controller:'editCtrl'
  })
.when('/verify', {
    templateUrl: 'views/verify.html',
            controller:'verifyCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

app.controller('mainCtrl', 
    function ($scope,$http,$rootScope){
        

      $scope.reInfo = function() {
          $http({method:'GET', url: '/give'}).
    then(function success(response) {
        if (response.data == "noooo") {
          $rootScope.userIn = false;
      
        } else {
          $rootScope.userIn = true;
        $rootScope.userInfo = response.data;
         $rootScope.showConfirmEmail = false;
       
       if ($rootScope.userInfo.role <1) {
        $rootScope.showConfirmEmail = true;
       }
       if ($rootScope.userInfo.role == 1) {
        $rootScope.showVerify = true;
       }

        }
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });
      
      }


      $scope.reLang = function() {
         $http.get('/myLang').success(function(data){
        var urlLang = '/lang/'+data.lang+'.json';

        $http.get(urlLang).success(function(data){
        $scope.lang = data;
      });

      });
      }

      $scope.reColor = function() {
        $http.get('/myColor').success(function(data){
       var urlColor = '/color/'+data.color+'.json';

        $http.get(urlColor).success(function(data){
        $scope.color = data;
      });
  });
}



       $http.get('/myLang').success(function(data){
        var urlLang = '/lang/'+data.lang+'.json';

        $http.get(urlLang).success(function(data){
        $scope.lang = data;
      });

      });

 $http.get('/myColor').success(function(data){
       var urlColor = '/color/'+data.color+'.json';

        $http.get(urlColor).success(function(data){
        $scope.color = data;
      });
  });

 $scope.setBlack = function() {
        $http.get('/setBlack').success(function(data){
        $scope.reColor();
      });
      }


       $scope.setWhite = function() {
        $http.get('/setWhite').success(function(data){
        $scope.reColor();
      });


      }




      $scope.setRu = function() {
        $http.get('/setRu').success(function(data){
        $scope.reLang();
      });
      }


       $scope.setEn = function() {
        $http.get('/setEn').success(function(data){
        $scope.reLang();
      });


      }

    	$http({method:'GET', url: '/give'}).
    then(function success(response) {
    		if (response.data == "noooo") {
    			$rootScope.userIn = false;
    	
    		} else {
    			$rootScope.userIn = true;
    		$rootScope.userInfo = response.data;
         $rootScope.showConfirmEmail = false;
       
       if ($rootScope.userInfo.role <1) {
        $rootScope.showConfirmEmail = true;
       }
       if ($rootScope.userInfo.role == 1) {
        $rootScope.showVerify = true;
       }

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