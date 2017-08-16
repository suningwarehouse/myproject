import {
    Inject
} from 'business/decorator/decorator'

@Inject
class checkHisReport {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        vm.appId = sessionStorage.getItem("appId");
        	//$stateParams.id
        console.log("appId:"+vm.appId);
        vm.neptuneUrl='http://neptunesit.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	vm.neptuneUrl = "http://neptunesit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.neptuneUrl = "http://neptunedev.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	vm.neptuneUrl = "http://neptune.cnsuning.com";
        } else {
        	vm.neptuneUrl = "http://neptune.cnsuning.com";
        }
        //http://neptunesit.cnsuning.com/#/checkHisReport/1953
        
        vm.url = $sce.trustAsResourceUrl(vm.neptuneUrl+'/#/checkHisReport/'+vm.appId);
    }
}

export default app => app.controller('checkHisReport', checkHisReport);