import {
    Inject
} from 'business/decorator/decorator';
import createFlowWithoutSystem from './createFlowWithoutSystem/createFlowWithoutSystem';
@Inject
class flowManage {
	constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;
        vm.sysList=[];
        vm.query = {};
        vm.pagination = {};
        vm.pagination.page = 1;
        vm.pagination.pageSize = 10;
        vm.pagination.totalCount = 0;
        init();

        function init() {
            HttpService.get('flow/listSystemByLoginUser').then(function (result) {
                vm.sysList = result;
            });

            search(1, vm.pagination.pageSize);
        }

        function search(page, pageSize) {
            vm.query.page = page;
            vm.query.pageSize = pageSize;
            HttpService.post("flow/search?page="+page+"&pageSize="+pageSize, vm.query).then(function (result) {
                vm.pagination = result;
            });

        }

        vm.paginationSearch = (pageArg, pageSizeArg, totalArg) => {
            search(pageArg, pageSizeArg);
        };

        vm.reset = ()=> {
            vm.query = {};
        };

        vm.delete = (id, flowName)=> {
            let parentScope=this.$parent;
            AlertService.confirm({
                title: '删除流水线确认',
                content: '您确认删除流水线【' + flowName + '】吗？'
            }).then(() => {
                    HttpService.post("flow/delete/" + id).then(function (result) {
                        AlertService.alert({title: "操作成功", content: "删除流水线成功！"});
                        vm.paginationSearch(1, vm.pagination.pageSize);
                    });
                }, () => {
                }
            );
        };
        
        vm.executeFlow = (flowId)=> {
            HttpService.get('flow/execute/' + flowId).then(function (result) {
                AlertService.alert({title: "提示", content: "操作成功！"});
                vm.paginationSearch(1, vm.pagination.pageSize);
            });
        }
        
        vm.showDialog = () => {
            DialogService.modal({
	            key: '新增流水线',
	            url: 'business/components/branchDetails/flowManage/createFlowWithoutSystem/createFlowWithoutSystem.html',
	            accept: (result) => {
	                console.log(result);
	            },
	            refuse: (reason) => {
	                console.log(reason);
	            }
	            }, {
	            key: '新增流水线',
	            data: {msg: 'this is data from modalCtrl!'}
            });
        };
    }
}

export default app => {
    app.controller('flowManage', flowManage);
    INCLUDE_ALL_MODULES([createFlowWithoutSystem], app)
    
};