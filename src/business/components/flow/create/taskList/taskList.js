/**
 * Created by 17030515 on 2017/3/27.
 */
import {
    Inject
} from 'business/decorator/decorator';

@Inject
class TaskListCtrl {
    constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;
        vm.taskTypeList=[];
        init();
        function init() {
            HttpService.get('dictItem/queryByTypeCode/1').then(d => {
                //vm.sysList=d.data;
                vm.taskTypeList = d;
            });
        }

        $scope.name = ['开始','结束'];
        $scope.cStep = 0;
        $scope.curr = function(currStep) {
            $scope.cStep = currStep;
        };
        $scope.nextStep = () => {
            $scope.cStep = Math.min(2, ++$scope.cStep);
        };

        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

        //动态判断任务名称是否重名
        vm.isTaskNameRepeat = () => {
            if (!vm.node.taskAlias) {
                return;
            }
            var taskNameRepeat=false;
            if (vm.data.flowNodeList && vm.data.flowNodeList.length > 0) {
                angular.forEach(vm.data.flowNodeList,function (item,idx) {
                    if(vm.node.taskAlias==item.taskAlias){
                        taskNameRepeat=true;
                        return false;
                    }
                });
            }
            vm.taskNameRepeat= taskNameRepeat;
        }
    }
}
export default app => {
    app.controller('TaskListCtrl', TaskListCtrl);
};