import {
    Inject
} from 'business/decorator/decorator'

@Inject
class codeCreate {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        vm.saturnUrl='http://saturnsit.cnsuning.com';  
        if (location.hostname.match('sit')) {
            vm.saturnUrl = "http://saturnsit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
            vm.saturnUrl = "http://10.24.40.170:8080";
        } else if (location.hostname.match('pre')) {
            vm.saturnUrl = "http://saturn.cnsuning.com";
        } else {
            vm.saturnUrl = "http://saturn.cnsuning.com";
        }
        vm.url = $sce.trustAsResourceUrl(vm.saturnUrl+"/#/editRepos/new?isPortalHomepage=1");
    }
}

export default app => app.controller('codeCreate', codeCreate);