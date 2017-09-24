angular.module('AppAdminPanel')
.service('AdminPanelService', function($resource,$http){
	var reqDelete =  $resource('/delete/:id');
	var reqAccept = $resource('/verify/:id');
	var reqBlock = $resource('/block/:id');
	var reqUsers = $resource('/getUsers');

	this.getUsers = function(func) {
		$http({method:'GET', url: '/getUsers'})
            .then(func, function error(response){
    		});
	}

	this.deleteUser = function(idUser) {
		return reqDelete.get({id:idUser});
	}

	this.acceptUser = function(idUser) {
		reqAccept.get({id:idUser});
		return reqAccept.delete({id:idUser});
	}

	this.blockUser = function(idUser) {
		return reqBlock.get({id:idUser});
	}

	this.showDelete = function(len) {
		if (len >=1) {
    		return true;
    	} else {
    		return false;
    	}
	}

	this.showVerify = function(len,verifyBool) {
		if (len ==1 && verifyBool != 0) {
    		return true;
    	} else {
    		return false;
    	}
	}

	this.getChooseColor = function(choosenUsers,id) {
		if (choosenUsers.indexOf(id) == -1) {
    		return ""
    	} else {
    		return "Thistle"
    	}
	}

	this.allClick = function(choose,allUsersInfo) {
		if (choose == 1) {
    			return allUsersInfo;
    		}
            
    	if (choose == 2) {
    		var tempInfo = [];
    		for (user in allUsersInfo) {
    			if (allUsersInfo[user].role == 2) {
    				tempInfo.push(allUsersInfo[user]);
    			}
    		}
    		return tempInfo;
    	}

    	if (choose == 3) {
    		var tempInfo = [];
    		for (user in allUsersInfo) {
    			if (allUsersInfo[user].verify == 1) {
    				tempInfo.push(allUsersInfo[user]);
    			}
    		}
    		return tempInfo;
    	}
	}

	this.sortStatus = function(allUsers) {
		return allUsers.sort(function(a,b) {
    	     if (a.role<b.role) {
    	     	return 1
    	     } else {
    	     	return -1;
    	     }
    	});
	}

	this.sortDate = function(allUsers) {
		return allUsers.sort(function(a,b) {
    	    if (a.date<b.date) {
    	     	return 1
    	    } else {
    	     	return -1;
    	    }
    	});
	}

	this.getColor = function(role,color,rol) {
		if (role == 1) {
     		if (color == "Thistle") {
     			return color
     		} else {
     			if (rol != 2) {
     				return "LightGreen" 
     			} else {
     				return color
     			}
     		}
     	} else {
     		return color;
     	}
	}

	this.getStatus = function(status) {
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
});