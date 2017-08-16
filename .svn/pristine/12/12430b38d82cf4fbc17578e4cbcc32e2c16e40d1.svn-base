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
class UranusTaskCtrl {
    constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;
        vm.pagination = {};
        vm.pagination.page = 1;
        vm.pagination.pageSize = 10;
        vm.pagination.totalCount = 0;
        vm.versionList=[];
        vm.branchList=[];
        vm.buildOrderList=[];
        vm.query={};
        vm.uranusDomainUrl="";
        init();
        function init() {

            HttpService.get("/common/getUrl/uranus").then(function (result) {
                vm.uranusDomainUrl = result;
            });

            HttpService.get("/common/queryVersionList/"+ vm.data.flow.sysId).then(function (result) {
                vm.versionList = result;
            });

            HttpService.get("/common/queryUranusDictList/3").then(function (result) {
                vm.buildOrderList = result;
            });

            search(1, vm.pagination.pageSize);

        }

        vm.selectTaskList=[];
        vm.selectTask = (evt,item)=> {
            vm.selectTaskList=[];
            if($(evt.currentTarget).prop("checked")){
                vm.selectTaskList.push(copy(item));
            }else {
                angular.forEach(vm.selectTaskList,function (it,idx) {
                    if(it.taskId==item.buildTaskId){
                        vm.selectTaskList.splice(idx,1);
                        return false;
                    }
                })
            }
        }

        function copy(resource){
            var tar={};
            tar.taskId=resource.buildTaskId;
            tar.taskName=resource.taskName;
            tar.taskType=1;
            tar.taskAlias=vm.node.taskAlias;
            return tar;
        }

        function search(page, pageSize) {
            vm.selectTaskList=[];
            vm.query.page = page;
            vm.query.pageSize = pageSize;
            vm.query.systemId=vm.data.flow.sysId;
            vm.query.branchIdList=null;
            //如果 版本有选择  分支 未选中
            if(vm.query.versionId && !vm.query.branchId && vm.branchList && vm.branchList.length>0){
                vm.query.branchIdList=[];
                angular.forEach(vm.branchList,function (item) {
                    vm.query.branchIdList.push(item.branchId);
                });
            }
            HttpService.post("/common/uranus/task/search", vm.query).then(function (result) {
                vm.pagination = result;
            });
        }

        vm.paginationSearch = (pageArg, pageSizeArg, totalArg) => {
            search(pageArg, pageSizeArg);
        };
        //提交
        vm.save = () => {
            //参数验证
            vm.data.callback(vm.selectTaskList);
            vm.close();
        };

        vm.versionChange = ()=> {
            if (!vm.query.versionId) {
                vm.branchList = [];
                return;
            }
            HttpService.get('common/queryBranchList/' + vm.query.versionId).then(d => {
                //vm.sysList=d.data;
                vm.branchList = d;
            });
        }
    }
}
export default app => {
    app.controller('UranusTaskCtrl', UranusTaskCtrl);
};