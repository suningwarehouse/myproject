import {
    Inject
} from 'business/decorator/decorator'

@Inject
class integrationManageByStstem {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        var selectView = $stateParams.name
        
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        
        var uranusUrl='http://uranussit.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	uranusUrl = "http://uranussit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	uranusUrl = "http://uranussit.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	uranusUrl = "http://uranus.cnsuning.com";
        } else {
        	uranusUrl = "http://uranus.cnsuning.com";
        }
        
        vm.url = $sce.trustAsResourceUrl(uranusUrl+'/#/phoebusBuildjob/'+appId);
    }
}

export default app => app.controller('integrationManageByStstem', integrationManageByStstem);