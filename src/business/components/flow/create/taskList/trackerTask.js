/**
 * Created by 17030515 on 2017/6/7.
 */
/**
 * Created by 17030515 on 2017/3/27.
 */
import {
    Inject
} from 'business/decorator/decorator';

@Inject
class TrackerTaskCtrl {
    constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;
        vm.pagination = {};
        vm.pagination.page = 1;
        vm.pagination.pageSize = 10;
        vm.pagination.totalCount = 0;
        init();
        function init() {
            search(1, vm.pagination.pageSize);
        }

        vm.selectTaskList=[];
        vm.selectTask = (evt,item)=> {
            vm.selectTaskList=[];
            if($(evt.currentTarget).prop("checked")){
                vm.selectTaskList.push(copy(item));
            }else {
                angular.forEach(vm.selectTaskList,function (it,idx) {
                    if(it.taskId==item.taskId){
                        vm.selectTaskList.splice(idx,1);
                        return false;
                    }
                })
            }
        }

        function search(page, pageSize) {
            vm.selectTaskList=[];
            vm.query.page = page;
            vm.query.pageSize = pageSize;
            vm.query.appId = vm.data.flow.sysId;
            HttpService.post("test/task/search/tracker/"+vm.data.flow.sysId, vm.query).then(function (result) {
                vm.pagination = result;
                if(vm.pagination.data&&vm.pagination.data.length>0){
                    angular.forEach(vm.pagination.data,function (it) {
                        it.taskType=vm.query.taskType;
                    })
                }
            });

        }

        vm.paginationSearch = (pageArg, pageSizeArg, totalArg) => {
            search(pageArg, pageSizeArg);
        };
        //提交
        vm.save = () => {
            //参数验证
            vm.data.callback(vm.selectTaskList);
            //取出真实的父scope
            //let parentScope=vm.$parent.data.parentScope;
            //parentScope.createProcess(vm.data.index, vm.group.groupName);
            vm.close();
        };

        function copy(resource){
            var tar={};
            tar.taskId=resource.taskId;
            tar.taskName=resource.taskName;
            tar.taskType=4;
            tar.taskAlias=vm.node.taskAlias;
            return tar;
        }
    }
}
export default app => {
    app.controller('TrackerTaskCtrl', TrackerTaskCtrl);
};