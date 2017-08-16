import {
    Inject
} from 'business/decorator/decorator'

@Inject
class versionCreate {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        vm.appId = sessionStorage.getItem("appId");
        	//$stateParams.id
        console.log("appId:"+vm.appId);
        vm.venus='http://venussit.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	vm.venus = "http://venussit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.venus = "http://venusdev.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	vm.venus = "http://venus.cnsuning.com";
        } else {
        	vm.venus = "http://venus.cnsuning.com";
        }
        
        vm.url = $sce.trustAsResourceUrl(vm.venus+'/#/versionManage/nosys/');
    }
}

export default app => app.controller('versionCreate', versionCreate);