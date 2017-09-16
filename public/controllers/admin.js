app.controller('adminCtrl', 
    function adminCtrl($scope,$http,$location,$rootScope){
    	var allUsersInfo;
    	$scope.choose = 1;
    	var verifyBool = 0;
    	
    	var choosenUsers = [];
    	 $scope.modalShown = false;

var reUser = function() {
    		$http({method:'GET', url: '/getUsers'}).
    then(function success(response) {
            if (response.data == "noooo") {
              
        
            } else {
              $scope.allUsers = response.data;
              allUsersInfo = response.data;
              choosenUsers = [];
            }
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });
    	}

    	$scope.block = function() {
    		for (it in choosenUsers) {
    			var id = choosenUsers[it];
    		var urlAdress = "/block/" + id;
    		 $http({method:'GET', url: urlAdress}).
    then(function success(response) {
            
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });

}
    	}

$scope.delete = function() {
    		for (it in choosenUsers) {
    			var id = choosenUsers[it];
    		var urlAdress = "/delete/" + id;
    		 $http({method:'GET', url: urlAdress}).
    then(function success(response) {
            
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });
    reUser();
}
    	}

        $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
   };

   		$scope.acceptUser = function(id) {
   		
   			var urlAdress = "/verify/" + id;

   			 $http({method:'GET', url: urlAdress}).
    then(function success(response) {
            
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });

   			 $http.delete(urlAdress).then(function success (response) {
                    console.log(response.data);

                });
   				console.log(urlAdress);
   				
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
    		console.log(choosenUsers);
    	}

    	$scope.showDelete = function() {
    		if (choosenUsers.length >=1) {
    			return true;
    		} else {
    			return false;
    		}
    	}

    	$scope.showVerify = function() {
    		if (choosenUsers.length ==1 && verifyBool != 0) {
    			return true;
    		} else {
    			return false;
    		}
    	}

    	$scope.getChooseColor = function(id) {
    		if (choosenUsers.indexOf(id) == -1) {
    			return ""
    		} else {
    			return "Thistle"
    		}
    	};

    	$scope.allClick = function() {
    		if ($scope.choose == 1) {
    			 $scope.allUsers = allUsersInfo;
    		}
    		if ($scope.choose == 2) {
    			var tempInfo = [];
    			for (user in allUsersInfo) {
    				console.log(user);
    				if (allUsersInfo[user].role == 2) {
    					tempInfo.push(allUsersInfo[user]);
    				}
    			}
    			$scope.allUsers = tempInfo;
    		}

    		if ($scope.choose == 3) {
    			var tempInfo = [];
    			for (user in allUsersInfo) {
    				console.log(user);
    				if (allUsersInfo[user].verify == 1) {
    					tempInfo.push(allUsersInfo[user]);
    				}
    			}
    			$scope.allUsers = tempInfo;
    		}
    	}

    	$scope.sortStatus = function() {
    	     $scope.allUsers.sort(function(a,b) {
    	     	if (a.role<b.role) {
    	     		return 1
    	     	} else {
    	     		return -1;
    	     	}
    	     });
    	}

    	$scope.verify = function() {
    		console.log("hello");
    		alert();
    	}

    	$scope.sortDate = function() {
    	     $scope.allUsers.sort(function(a,b) {
    	     	if (a.date<b.date) {
    	     		return 1
    	     	} else {
    	     		return -1;
    	     	}
    	     });
    	}
 	$http({method:'GET', url: '/getUsers'}).
    then(function success(response) {
            if (response.data == "noooo") {
              
        
            } else {
              $scope.allUsers = response.data;
              allUsersInfo = response.data;
             
            }
            console.log(response.data);
    }, function error(response){
            console.log("Возникла ошибка");
    });
     $scope.getColor = function(role,id,rol) {
     	var color = $scope.getChooseColor(id);
     	if (role == 1) {
     		if (color == "Thistle") {
     			return color
     		} else {
     			if (rol != 2) {
     		return "LightGreen" } else {
     			return color
     		}}
     	} else {
     		return color;
     	}
     }

     $scope.getStatus = function(status) {
     	if (status == 0) {
     		return "Email not verified"
     	}
     	if (status == 1) {
     		return "Email verified"
     	}
     	if (status == 2) {
     		return "Passport verified"
     	}
     	return "Admin"


     }

    }


 
)