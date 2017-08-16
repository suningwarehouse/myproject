import {
    Inject
} from 'business/decorator/decorator'

@Inject
class projectManage {
    constructor($scope, LoginService, $rootScope, UserService) {
        let vm = $scope;
       //左侧菜单栏
        $scope.menus = [
            {
                name: '应用报告首页',
                state: 'topHead.projectManage.appProcess',
                clazz: 'fa fa-laptop'
            },{
                name: '应用基本信息',
                state: 'topHead.projectManage.appDetail',
                clazz: 'fa fa-laptop'
            },{
                name: '蛙测任务',
                state: 'topHead.projectManage.testTask',
                clazz: 'fa fa-laptop'
            },{
                name: '安全扫描任务',
                state: 'topHead.projectManage.securityScanTask',
                clazz: 'fa fa-laptop'
            },{
                name: '部署单元',
                state: 'topHead.projectManage.deployCell',
                clazz: 'fa fa-laptop'
            },{
                name: '应用报告5',
                state: 'Console.Portal',
                clazz: 'fa fa-laptop'
            },{
                name: '应用报告6',
                state: 'Console.Portal',
                clazz: 'fa fa-laptop'
            },{
                name: '应用报告7',
                state: 'Console.Portal',
                clazz: 'fa fa-laptop'
        }];

    }
}
export default app => {
    app.controller('projectManage', projectManage);
   
};
