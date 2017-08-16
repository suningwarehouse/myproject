/**
 * Created by 17030515 on 2017/6/16.
 */
import {
    Inject
} from 'business/decorator/decorator'
@Inject
class FlowNotifyCtrl {
    constructor($scope, HttpService, AlertService, DialogService, $stateParams, $interval, $q, $rootScope) {
        let vm = $scope;
        vm.eventTypeList=[];
        vm.notifyList = [];
        init();
        function init() {
            HttpService.get('dictItem/queryByTypeCode/2').then(function (result) {
                vm.eventTypeList = result;
            });

            queryNotifyList();
        }

        function queryNotifyList() {
            HttpService.post("flow/notify/querySet/" + $stateParams.flowId).then(function (result) {
                vm.notifyList = result;
            });
        }

        vm.save = ()=> {
            if(!vm.notifyList||vm.notifyList.length<1){
                return AlertService.alert({title: "提示", content: "暂时不支持通知！"});;
            }

            HttpService.post("flow/notify/save",vm.notifyList).then(function (result) {
                vm.notifyList = result;
                AlertService.alert({title: "提示", content: "通知设置成功！"});
            });
        }

        // 查看任务详情
        vm.showNotifyUser = (notify) => {
            DialogService.modal({
                key: 'flowNotifyUser',
                url: 'business/components/flow/detail/flowNotifyUser.html',
            }, {
                key: 'flowNotifyUser',
                data: {
                    msg: 'this is data from modalCtrl!',
                    notify:notify
                }
            });
        }

    }
}

export default app => app.controller('FlowNotifyCtrl', FlowNotifyCtrl)