import {
    Inject
} from 'business/decorator/decorator'

@Inject
class deploymentListBySystem {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        var selectView = $stateParams.id
        
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        
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
        
        vm.url = $sce.trustAsResourceUrl(vm.odin3Url+'#/releasesheetPortal/'+appId);
    }
}

export default app => app.controller('deploymentListBySystem', deploymentListBySystem);