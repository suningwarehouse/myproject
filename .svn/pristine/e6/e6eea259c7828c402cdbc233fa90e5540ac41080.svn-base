import {
    Inject
} from 'business/decorator/decorator';

@Inject
class overview {
    constructor($scope, DialogService,ReposService,$state,$stateParams,HttpService,FileUploader,$rootScope) {
        let vm = $scope;


       $rootScope.setSession=(appId,appName)=>{
            sessionStorage.setItem("appId", appId);
            sessionStorage.setItem("appName", appName);
        }

        //左侧菜单栏
        $scope.menus = [
            {
                name: '概览',
                state: 'topHead.overview.homePage',
                clazz: 'icon-概览'
            },
            {
                name: '项目管理',
                state: 'topHead.overview.proManage',
                clazz: 'icon-项目管理-copy-5'
            },{
                name: '应用管理',
                state: 'topHead.overview.appManage',
                clazz: 'icon-应用管理-copy-2'
            },{
                name: '版本管理',
                state: 'topHead.overview.versionManage',
                clazz: 'icon-版本管理-copy-2'
            },{
                name: '代码托管',
                state: 'topHead.overview.repositoryManage',
                clazz: 'icon-代码托管-copy-2'
            },{
                name: '持续集成',
                state: 'topHead.overview.integrationManage',
                clazz: 'icon-持续集成-copy-2'
            },{
                name: '过程改进',
                state: 'topHead.overview.improvementManage',
                clazz: 'icon-过程改进'
            },{
                name: '构件中心',
                state: 'topHead.overview.componentManage',
                clazz: 'icon-构建中心-copy-2'
            },{
                name: '流水线',
                state: 'topHead.overview.flowManage',
                clazz: 'icon-交付流水线-copy-2'
            },{
                name: '持续部署',
                state: 'topHead.overview.deploymentManage',
                clazz: 'icon-部署管理-copy-2'
            }];

    }
}

export default app =>{
    app.controller('overview', overview)

}

