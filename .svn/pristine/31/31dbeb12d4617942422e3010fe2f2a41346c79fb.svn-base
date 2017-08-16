import {
    Inject
} from 'business/decorator/decorator'

@Inject
class repositoryManageBySystem {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        var selectView = $stateParams.id
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        vm.saturnUrl='http://saturnsit.cnsuning.com';///#/branch/165
        
        if (location.hostname.match('sit')) {
        	vm.saturnUrl = "http://saturnsit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.saturnUrl = "http://jupiterdev.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	vm.saturnUrl = "http://saturn.cnsuning.com";
        } else {
        	vm.saturnUrl = "http://saturn.cnsuning.com";
        }
        //http://saturnsit.cnsuning.com/#/overview?appId=1895&appName=svnan
        vm.url = $sce.trustAsResourceUrl(vm.saturnUrl+'/#/overview?'+'appId='+appId+'&appName='+appName);
        
    }
}

export default app => app.controller('repositoryManageBySystem', repositoryManageBySystem);