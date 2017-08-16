/**
 * Created by 17030515 on 2017/3/27.
 */
import {
    Inject
} from 'business/decorator/decorator';

@Inject
class AddGroupNameCtrl {
    constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;
        vm.group = {};
        init();
        function init() {
            vm.group.groupName = vm.data.groupName;
        }

        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

        //提交
        vm.save = () => {
            //参数验证
            if (!vm.groupForm.$valid&&!vm.groupNameRepeat) {
                return;
            }
            vm.data.callback(vm.data.index, vm.group.groupName);
            //取出真实的父scope
            //let parentScope=vm.$parent.data.parentScope;
            //parentScope.createProcess(vm.data.index, vm.group.groupName);
            vm.close();
        };
        vm.flowNameRepeat=false;
        //动态判断代码库是否重名
        vm.isGroupNameRepeat = () => {
            if (!vm.group.groupName) {
                return;
            }
            var groupNameRepeat=false;
            if (vm.data.nodeGroupList && vm.data.nodeGroupList.length > 0) {
                angular.forEach(vm.data.nodeGroupList,function (item,idx) {
                    if(vm.group.groupName==item.groupName){
                        if(vm.data.opt=='add'
                            ||(vm.data.opt=='edit'&&vm.data.index!=idx)){
                            groupNameRepeat=true;
                            return false;
                        }
                    }
                });
            }
            vm.groupNameRepeat= groupNameRepeat;
        }
    }
}
export default app => {
    app.controller('AddGroupNameCtrl', AddGroupNameCtrl);
};