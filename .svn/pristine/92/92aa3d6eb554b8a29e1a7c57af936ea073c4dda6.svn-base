/**
 * Created by 17030515 on 2017/6/15.
 */
import {
    Inject
} from 'business/decorator/decorator'
@Inject
class FlowCronCtrl {
    constructor($scope, HttpService, DialogService, AlertService, $stateParams, $state, $interval, $q, $rootScope) {
        let vm = $scope;
        vm.flow = {};
        init();
        function init() {
            vm.flow.id = vm.data.flow.id;
            vm.flow.executeType = vm.data.flow.executeType;
            vm.flow.executeCron = vm.data.flow.executeCron;
        }

        vm.saveExpression = ()=> {
            //参数验证
            if (!vm.flowSetForm.$valid) {
                return;
            }
            HttpService.post("flow/cron/save", vm.flow).then(function (result) {
                AlertService.alert({title: "提示", content: "执行计划配置成功！"});
                vm.data.flow.executeType=vm.flow.executeType;
                vm.data.flow.executeCron=vm.flow.executeCron;
                vm.close();
            });
        }

        vm.executeTypeChange = (executeType)=> {
            if (executeType == 0) {
                vm.flow.executeCron = "";
            }
        }

        vm.isValidExpression = true;
        vm.validExpression = ()=> {
            var params ={};
            params.expression = vm.flow.executeCron;
            HttpService.post("common/isValidExpression", params,{notDisplayLoading: true}).then(function (result) {
                vm.isValidExpression = result;
            });
        }

        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);
            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

    }
}

export default app => app.controller('FlowCronCtrl', FlowCronCtrl)