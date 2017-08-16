import {
    Inject
} from 'business/decorator/decorator'

@Inject
class componentManageSearch {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        
        var url='http://jupitersit.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	url = "http://jupitersit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	url = "http://jupiterdev.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	url = "http://jupiter.cnsuning.com";
        } else {
        	url = "http://jupiter.cnsuning.com";
        }
        //http://jupitersit.cnsuning.com/#/overview?appId=1895&appName=test1
        vm.url = $sce.trustAsResourceUrl(url+'/#/overview?'+'appId='+appId+'&appName='+appName);
    }
}

export default app => app.controller('componentManageSearch', componentManageSearch);