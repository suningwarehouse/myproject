import {
    Inject
} from 'business/decorator/decorator'

@Inject
class FlowDetailCtrl {
    constructor($scope, $stateParams, $state, HttpService, AlertService, DialogService, $q, $rootScope, $interval) {
        let vm = $scope;
        let paramsSysId=$stateParams.sysId;
        vm.tmpSysId=paramsSysId;
        vm.query = {};
        vm.pagination = {};
        vm.pagination.page = 1;
        vm.pagination.pageSize = 10;
        vm.pagination.totalCount = 0;

        $(function () {
            $("[data-toggle='popover']").popover();
        });
        vm.downLoadPro = 0;
        vm.initNum = 1;
        vm.statusCode = 1;
        vm.myDate = new Date();
        vm.sysList = [];
        init();
        function init() {
            vm.isFirst = true;
            vm.isSecond = false;
            vm.isThird = false;

            HttpService.get('flow/listSystemByLoginUser').then(function (result) {
                vm.sysList = result;
            });

            HttpService.get('flow/getDetail/' + $stateParams.flowId).then(function (result) {
                vm.flow = result.flow;
                vm.nodeGroupList = result.nodeGroupList;
                vm.flowExecuteStatus=result.executeStatus;
                vm.query.flowId = vm.flow.id;
                //search(1, vm.pagination.pageSize);
            });
        }

        vm.crumbBaseData = [
            {href: "/", title: "首页"},
            {href: "/#/flowList/"+paramsSysId, title: "交付流水线"},
            {href: "", title: "流水线详情"}
        ];

        //vm.processList = [{"name":"开始","childList":[{"name":"Param_1"},{"name":"Param_2"},{"name":"Param_3"}],"childListNum":0},{"name":"阶段1","childList":[{"name":"Example1"},{"name":"Example2"},{"name":"Example3"}],"childListNum":0},{"name":"结束","childList":[],"childListNum":0}];


        vm.change = (d) => {
            if (d === 1) {
                vm.isFirst = true;
                vm.isSecond = false;
                vm.isThird = false;
                vm.initNum = 1;
            } else if (d === 2) {
                vm.isFirst = false;
                vm.isSecond = true;
                vm.isThird = false;
                vm.initNum = 2;
                search(1, vm.pagination.pageSize);
            } else {
                vm.isFirst = false;
                vm.isSecond = false;
                vm.isThird = true;
                vm.initNum = 3;
            }

        }

        vm.executeFlow = ()=> {
            HttpService.get('flow/execute/' + $stateParams.flowId).then(function (result) {
                AlertService.alert({title: "提示", content: "操作成功！"});
            });
        }

        function search(page, pageSize) {
            vm.query.page = page;
            vm.query.pageSize = pageSize;
            HttpService.post("flow/log/search", vm.query).then(function (result) {
                vm.pagination = result;
            });

        }

        vm.paginationSearch = (pageArg, pageSizeArg, totalArg) => {
            search(pageArg, pageSizeArg);
        };

        // 查看任务详情
        vm.showDetail = (id) => {
            DialogService.modal({
                key: 'flowHistoryDetail',
                url: 'business/components/flow/detail/flowHistoryDetail.html',
            }, {
                key: 'flowHistoryDetail',
                data: {
                    msg: 'this is data from modalCtrl!',
                    id: id
                }
            });
        }

        // 查看任务详情
        vm.showCronSet = (flow) => {
            DialogService.modal({
                key: 'flowCron',
                url: 'business/components/flow/detail/flowCron.html',
            }, {
                key: 'flowCron',
                data: {
                    msg: 'this is data from modalCtrl!',
                    id: flow.id,
                    flow:vm.flow
                }
            });
        }

        vm.delete = (id, flowName)=> {
            let parentScope=this.$parent;
            AlertService.confirm({
                title: '删除流水线确认',
                content: '您确认删除流水线【' + flowName + '】吗？'
            }).then(() => {
                    HttpService.post("flow/delete/" + id).then(function (result) {
                        AlertService.alert({title: "操作成功", content: "删除流水线成功！"});
                        $state.go("topHead.leftColumn.navheadDetail.flowList",{sysId:paramsSysId});
                    });
                }, () => {
                }
            );
        };
    }
}

export default app => app.controller('FlowDetailCtrl', FlowDetailCtrl)