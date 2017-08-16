import {
    Inject
} from 'business/decorator/decorator'

@Inject
class appInfoCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService) {
        let vm = $scope;
		vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
        vm.crumbBaseData = [
                            { href: "/", title: "首页" },
                            { href: "/#/overview/appManage/", title: "应用管理" },
                            { href: "", title: "应用详情" }
                        ];
        
        //调用入口函数
        init();

        function init(){
        	HttpService.get('app/'+vm.appId).then(result => {
                vm.app = result.app;
                vm.users= result.users;
                
                vm.users.forEach(function(item){
                	if(item.roleName=="技术总监"){
                		vm.techChief=item.listUserMemberDO;
                	}else if(item.roleName=="应用负责人(owner)"){
                		vm.appAdmin=item.listUserMemberDO;
                		vm.techManager=item.listUserMemberDO;
                	}
                })
        	});
        	
        	
        	HttpService.get('app/getItpUrl').then(result => {
                vm.itpUrl=result+'/processDraftFilter.do?businessTemplateId=NSOA2050';
        	});
        }

        $scope.showDialog = () => {
           window.open(vm.itpUrl);
        };
    }
}

export default app => app.controller('appInfoCtrl', appInfoCtrl);