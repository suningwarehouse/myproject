import {
    Inject
} from 'business/decorator/decorator'

@Inject
class appDetailCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        vm.selectView = $stateParams.name;
        
        var appId = sessionStorage.getItem("appId");
        var appName = sessionStorage.getItem("appName");
        
        vm.venusUrl='http://venussit.cnsuning.com';///#/branch/165
        
        if (location.hostname.match('sit')) {
        	vm.venusUrl = "http://venussit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.venusUrl = "http://venussit.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	vm.venusUrl = "http://venus.cnsuning.com";
        } else {
        	vm.venusUrl = "http://venus.cnsuning.com";
        }
        
        //var url='http://venus'+DetecEnv()+'.cnsuning.com/#/'+vm.selectView+'/'+(vm.selectView==='version'?$stateParams.id+'/':$stateParams.num)
        var url = vm.venusUrl+'/#/'+vm.selectView+'/'+(vm.selectView==='version'?appId+'/':$stateParams.num)
        vm.url = $sce.trustAsResourceUrl(url);

    }
}

export default app => app.controller('appDetailCtrl', appDetailCtrl);