app.controller('panelCtrl', 
    function panelCtrl($scope,$http,$location,$rootScope){
       $scope.showConfirmEmail = false;
       if ($scope.userInfo.role <1) {
        $scope.showConfirmEmail = true;
       }


    }




)