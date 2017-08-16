/**
 * Created by 17030515 on 2017/6/1.
 */
import {
    Inject
} from 'business/decorator/decorator'
@Inject
class FlowHistoryDetailCtrl {
    constructor($scope, HttpService, DialogService, $stateParams, $state, $interval, $q, $rootScope) {
        let vm = $scope;
        vm.initNum = 2;
        init();
        vm.flow = {};
        vm.sysList = [];
        vm.nodeLogStatus = null;
        function init() {
            HttpService.get('flow/listSystemByLoginUser').then(function (result) {
                vm.sysList = result;
            });

            HttpService.get('flow/log/getDetail/' + vm.data.id).then(function (result) {
                vm.flow = result.flow;
                vm.nodeGroupList = result.nodeGroupList;
                vm.history = result.flowExeLogPO;
                if(result.flowNodeLogPO){
                    vm.downLoad(result.flowNodeLogPO.id);
                }

            });
        }

        //下载事件
        var timer

        vm.close = () => {
            $interval.cancel(timer);
            // way 1:
            DialogService.dismiss(vm.key);
            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };


        vm.downLoad = (id) => {
            var nextId = id;
            vm.next = {};
            timer = $interval(function () {
                if (!nextId) {
                    $interval.cancel(timer);
                    return;
                }
                getStatus(nextId);
            }, 10000);
        }


        function getStatus(nextId) {
            HttpService.get('flow/log/getStatus/' + nextId,undefined,{notDisplayLoading:true}).then(function (result) {
                angular.forEach(vm.nodeGroupList, function (item, idx) {
                    var flowNodeList = item.flowNodeList;
                    if (flowNodeList) {
                        var isBreak = false;
                        angular.forEach(flowNodeList, function (im, i) {
                            if (im.id == result.nodeId) {
                                im.executeStatus = result.executeStatus;
                                //任务执行中
                                if (im.executeStatus == 1) {
                                    isBreak = true;
                                    return false;
                                    //任务完成
                                } else if (result.executeStatus == 2) {
                                    item.finishNum = item.finishNum + 1;
                                    //失败 或 停止
                                } else {
                                    $interval.cancel(timer);
                                    item.executeStatus = result.executeStatus;
                                }

                                //阶段所有任务都完成后
                                if (item.finishNum == flowNodeList.length) {
                                    item.executeStatus = 2;
                                }

                                if (result.nextLogId) {
                                    nextId = result.nextLogId;
                                    getStatus(nextId);
                                }
                                //最后一个任务执行完成 后 结束阶段 完成
                                if (result.executeStatus == 2 && !result.nextLogId) {
                                    var endGroup = vm.nodeGroupList[vm.nodeGroupList.length - 1];
                                    endGroup.executeStatus = 2;
                                    endGroup.finishNum=1;
                                    $interval.cancel(timer);
                                }
                                return false;
                            }
                        });

                        return !isBreak;
                    }
                });
            });
        }
    }
}

export default app => app.controller('FlowHistoryDetailCtrl', FlowHistoryDetailCtrl)
