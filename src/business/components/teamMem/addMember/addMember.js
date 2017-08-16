import {
    Inject
} from 'business/decorator/decorator'
import './addMember.css'
@Inject
class addMember {
    constructor($scope, $filter,DialogService, HttpService, userService, $stateParams,$state) {
        let vm = $scope;
        let formData=vm.formData={};
        vm.userNoList=[];
        //vm.commit={userNoList:vm.userNoList};
        vm.commit = {};
        vm.commit.userNoList =[];
        vm.userNoList;
		vm.getandupdate = num => {
            return userService.getAndUpdateUser(num).then(d => {
                d = d.filter(function (e) {
                    return e.code === num
                })
                d.forEach(e => {
                    e.id = e.code;
                    e.text = e.name
                })
                return d
            })
        }

        vm.appName=$scope.data.appName;
        vm.appId=$scope.data.appId;
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        
        onLoadPage();
		function onLoadPage(){
        	HttpService.get('team/roles?roleName=').then(d=>{
        		vm.roleDOList = d;
        		
        		vm.roleDOList.forEach((e, i) => {
					if (e.roleName === "技术总监") {
						vm.roleDOList.splice(i,1);
					}
				});
        	});
        	
        	
        	userService.getSelectUsers().then(function (result) {
                vm.users = result;
                vm.users.forEach(e => {
                    e.text = e.name;
                    e.id = e.code;
                })
            })
        };
        
        vm.onChangeRoleDOSlelect = (roleDO) => {
			if (typeof (roleDO) == "undefined" || roleDO == null) {
				vm.commit.phoebusRoleId = -1;
			} else {
				vm.commit.phoebusRoleId = roleDO.roleId;
			}
		};
        
		var userNoList = [];
        vm.commit=()=>{
        	vm.userNoList.forEach(e => {
        		userNoList.push(e.code);
            })
        	HttpService.post('team',{
        		systemId:appId,
        		roleId:vm.commit.phoebusRoleId,
        		userNoList:userNoList
        	}).then(d=>{
        		$state.reload('topHead.leftColumn.teamMem')
        		vm.close()
        	})
    	}
        
        //关闭
        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };
    }
}

export default app => app.controller('addMember', addMember);