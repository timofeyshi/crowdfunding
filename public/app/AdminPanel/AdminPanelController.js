angular.module('AppAdminPanel')

.controller('adminCtrl', 
    function adminCtrl($scope,$http,$location,$rootScope,AdminPanelService){
    	var allUsersInfo;
    	$scope.choose = 1;
    	var verifyBool = 0;
    	var choosenUsers = [];
    	$scope.modalShown = false;

        var reUser = function() {
            AdminPanelService.getUsers(function success(response) {
                $scope.allUsers = response.data;
                allUsersInfo = $scope.allUsers;
                choosenUsers = [];
            });    
    	}

    	$scope.block = function() {
    		for (it in choosenUsers) {
                AdminPanelService.blockUser(choosenUsers[it]);
            }
            choosenUsers = [];
    	}

        $scope.delete = function() {
    		for (it in choosenUsers) {
                AdminPanelService.deleteUser(choosenUsers[it]);
            }
            reUser();
    	}

        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

   		$scope.acceptUser = function(id) {
            AdminPanelService.acceptUser(id);
   			setTimeout(reUser(),1000);
            $scope.toggleModal();
            reUser();
   		}

    	$scope.chooseUser = function(id,verifyBoo,us) {
    		if (choosenUsers.indexOf(id) == -1) {
    		   choosenUsers.push(id);
    		   if (verifyBoo == 1) {
    			    verifyBool = id;
    			    $scope.verifyUser = us;
    		    } else {
    			    verifyBool = 0;
    		    }
    	    } else {
    		    var place = choosenUsers.indexOf(id);
    		    choosenUsers.splice(place,1);
    		}
    	}

    	$scope.showDelete = function() {
            return AdminPanelService.showDelete(choosenUsers.length);
    	}

    	$scope.showVerify = function() {
    		return AdminPanelService.showVerify(choosenUsers.length,verifyBool);
    	}

    	$scope.getChooseColor = function(id) {
            return AdminPanelService.getChooseColor(choosenUsers,id);
    	}

    	$scope.allClick = function() {
            $scope.allUsers = AdminPanelService.allClick($scope.choose,allUsersInfo);
    	}

    	$scope.sortStatus = function() {
            $scope.allUsers = AdminPanelService.sortStatus($scope.allUsers);
    	}

    	$scope.sortDate = function() {
             $scope.allUsers = AdminPanelService.sortDate($scope.allUsers);
    	}
 	    
        reUser();

        $scope.getColor = function(role,id,rol) {
            return AdminPanelService.getColor(role,$scope.getChooseColor(id),rol);
        }

        $scope.getStatus = function(status) {
            return AdminPanelService.getStatus(status);
        }

});