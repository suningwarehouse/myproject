import {
    Inject
} from 'business/decorator/decorator'

@Inject
class componentManageCount {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        var selectView = $stateParams.name
        
        var url='http://jupitersit.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	url = "http://jupitersit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	url = "http://jupitersit.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	url = "http://jupiter.cnsuning.com";
        } else {
        	url = "http://jupiter.cnsuning.com";
        }
        //http://odinsit.cnsuning.com/#/releasesheet
        vm.url = $sce.trustAsResourceUrl(url+'/#/dependency');
    }
}

export default app => app.controller('componentManageCount', componentManageCount);