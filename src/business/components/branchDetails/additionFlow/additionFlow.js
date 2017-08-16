import {
    Inject
} from 'business/decorator/decorator'

@Inject
class additionFlow {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,$sce,DetecEnv) {
        let vm = $scope;
        vm.appId = sessionStorage.getItem("appId");
        	//$stateParams.id
        vm.url = "";
        HttpService.get("/common/getUrl/uranus").then(function (result) {
            vm.url = $sce.trustAsResourceUrl(result+'/#/createBuildTask/'+vm.appId);
        });
    }
}

export default app => app.controller('additionFlow', additionFlow);