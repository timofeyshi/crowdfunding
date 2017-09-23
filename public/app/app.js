

var app = angular.module('RoutingApp', ['ui.router','ngSanitize','AppLogin','AppRegister','AppHome','AppUserPanel','AppMyProjects','AppAddProject',
  'AppAllProjects','AppProjectPage','AppEditProject','AppVerifyUser','AppAdminPanel','AppProfile','AppHelpProject','AppFindProject']);
app.run(function($rootScope) {

$rootScope.isIn = false;


});


  app.config(  function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');
      $stateProvider
        
        
      
        
      
         
       
        
       
       
        
 
});

app.controller('mainCtrl', 
    function ($scope,$http,$rootScope,$location){
        
      $scope.findProject = function(text) {
        
      
        var url = '/find/' + text;
        $location.url(url);

      };

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


app.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, 
        transclude: true, 
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};

            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }

            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }

            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ></div><div class='ng-modal-dialog-content' ng-transclude></div> </div></div>" // Смотрите ниже
    };
});