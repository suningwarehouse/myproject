/**
 * Created by 17030515 on 2017/6/20.
 */
import {
    Inject
} from 'business/decorator/decorator'
@Inject
class FlowHistoryDetailViewCtrl {
    constructor($scope, HttpService, DialogService, $stateParams, $state, $interval, $q, $rootScope) {
        let vm = $scope;
        /*vm.crumbBaseData = [
            { href: "/", title: "首页" },
            { href: "/#/flowList/", title: "交付流水线" },
            { href: "", title: "流水线执行日志" }
        ];*/
        vm.initNum = 2;
        init();
        vm.flow = {};
        vm.sysList = [];
        vm.nodeLogStatus = null;
        function init() {
            HttpService.get('flow/listSystemByLoginUser').then(function (result) {
                vm.sysList = result;
            });

            HttpService.get('flow/log/getDetail/' + $stateParams.id).then(function (result) {
                vm.flow = result.flow;
                vm.nodeGroupList = result.nodeGroupList;
                vm.history = result.flowExeLogPO;
            });
        }
    }
}

export default app => app.controller('FlowHistoryDetailViewCtrl', FlowHistoryDetailViewCtrl)
