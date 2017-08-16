import {
    Inject
} from 'business/decorator/decorator'

@Inject
class repositoryManageByHealth {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        var selectView = $stateParams.id
        
        vm.saturnUrl='http://saturnsit.cnsuning.com';///#/branch/165
        
        if (location.hostname.match('sit')) {
        	vm.saturnUrl = "http://saturnsit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.saturnUrl = "http://10.24.40.170:8080";
        } else if (location.hostname.match('pre')) {
        	vm.saturnUrl = "http://saturn.cnsuning.com";
        } else {
        	vm.saturnUrl = "http://saturn.cnsuning.com";
        }
        
        vm.url = $sce.trustAsResourceUrl(vm.saturnUrl+'/#/reposHealth');
        //vm.url = $sce.trustAsResourceUrl("http://saturnsit.cnsuning.com/#/");
        
    }
}

export default app => app.controller('repositoryManageByHealth', repositoryManageByHealth);