import {
    Inject
} from 'business/decorator/decorator'

@Inject
class deploymentEnvInstance {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv,AlertService) {
        let vm = $scope;

        vm.appId = sessionStorage.getItem("appId")
        vm.appName = sessionStorage.getItem("appName")
        
        vm.odin3Url='http://odinsit3.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	vm.odin3Url = "http://odinsit3.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.odin3Url = "http://odinsit3.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	vm.odin3Url = "http://odin.cnsuning.com";
        } else {
        	vm.odin3Url = "http://odin.cnsuning.com";
        }
        
        //href: odinUrl + '/#/system/'+vm.appName+'/'+vm.appId+'/envDetail'
        if(vm.appId){
        	vm.url = $sce.trustAsResourceUrl(vm.odin3Url+'/#/systemPortal/'+vm.appName+'/'+vm.appId+'/envDetail');
        }else{
        	AlertService.alert({
                title: "提示",
                content: '请选应用！'
            });
        }
    }
}

export default app => app.controller('deploymentEnvInstance', deploymentEnvInstance);