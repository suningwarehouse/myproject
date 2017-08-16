import {
    Inject
} from 'business/decorator/decorator'

@Inject
class appManage {
    constructor($scope, LoginService, $rootScope, UserService) {
        let vm = $scope;
        vm.appId = sessionStorage.getItem("appId");
        vm.appName=sessionStorage.getItem("appName");
        
        var odinUrl='http://odinsit.cnsuning.com';
        
        if (location.hostname.match('sit')) {
            odinUrl = "http://odinsit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	 odinUrl = "http://odinsit.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	 odinUrl = "http://odinsit.cnsuning.com";
        } else {
        	odinUrl = "http://odin.cnsuning.com";
        }
       //左侧菜单栏
        $scope.menus = [
            {
                name: '应用版本历程',
                state: 'topHead.appManage.appProcess',
                clazz: 'fa fa-laptop'
            },{
                name: '基本信息',
                state: 'topHead.appManage.appDetail',
                clazz: 'fa fa-laptop'
            },{
                name: '蛙测任务',
                state: 'topHead.appManage.testTask',
                clazz: 'fa fa-laptop'
            },{
                name: '安全扫描任务',
                state: 'topHead.appManage.securityScanTask',
                clazz: 'fa fa-laptop'
            },{
                name: '部署单元',
                state: 'topHead.appManage.appPackage',
                clazz: 'fa fa-laptop'
            },{
                name: "自动化部署单元",
                icon: "fa icon-document",
                clazz: 'fa fa-laptop',
                children: [{
                            name: "发布单",
                            icon: "fa icon-system",
                            href: odinUrl+'/#/releasesheet/'+vm.appId
                        }, {
                             code: "4-2",
                             name: "环境实例",
                             icon: "fa icon-system",
                             href:  odinUrl + '/#/system/'+vm.appName+'/'+vm.appId+'/envDetail'
                        }, {
                            code: "4-3",
                            name: "自定义发布流程",
                            icon: "fa icon-system",
                            href:  odinUrl + '/#/actionSetListSys/'+vm.appId
                        }, {
                            code: "4-4",
                            name: "自定义发布策略",
                            icon: "fa icon-system",
                            href:  odinUrl + '/#/overview'
                        }]
            }];

    }
}
export default app => {
    app.controller('appManage', appManage);
   
};
