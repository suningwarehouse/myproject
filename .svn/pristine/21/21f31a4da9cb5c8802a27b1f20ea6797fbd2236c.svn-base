import {
    Inject
} from 'business/decorator/decorator'
import addGroupName from './addGroupName/addGroupName';
@Inject
class FlowCreateCtrl {
    constructor($scope, HttpService, DialogService, $stateParams, $state, AlertService, $q, $rootScope) {
        let vm = $scope;
        let paramsSysId=sessionStorage.getItem("appId");
        vm.sysIdCombboxDisabled=false;
        vm.initNum = 1;
        init();
        vm.flow = {};
        vm.sysList = [];
        function init() {

            if(paramsSysId){
                vm.sysIdCombboxDisabled=true;
            }

            HttpService.get('flow/listSystemByLoginUser').then(function (result) {
                vm.sysList = result;
                if(paramsSysId){
                    vm.flow.sysId=Number(paramsSysId);
                    vm.flow.sysName="";
                    if(vm.sysList&&vm.sysList.length>0){
                        angular.forEach(vm.sysList,function (it) {
                            if(vm.flow.sysId==it.projectId){
                                vm.flow.sysName=it.projectName;
                                return false;
                            }
                        })
                    }
                }
            });

            vm.isFirst = false;
            vm.isSecond = true;
        }

        vm.crumbBaseData = [
            {href: "/", title: "首页"},
            {href: "/#/flowList/"+paramsSysId, title: "交付流水线"},
            {href: "", title: "新增流水线"}
        ];

        vm.nodeGroupList = [{
            "groupName": "开始",
            "groupType": 0,
            "flowNodeList": [],
            "childListNum": 0
        }, {"groupName": "结束", "groupType": -1, "flowNodeList": [], "childListNum": 0}];

        vm.sysIdChange = ()=> {
            vm.flow.sysName="";
            if(vm.sysList&&vm.sysList.length>0){
                angular.forEach(vm.sysList,function (it) {
                    if(vm.flow.sysId==it.projectId){
                        vm.flow.sysName=it.projectName;
                        return false;
                    }
                })
            }
            vm.nodeGroupList=[{
                "groupName": "开始",
                "groupType": 0,
                "flowNodeList": [],
                "childListNum": 0
            }, {"groupName": "结束", "groupType": -1, "flowNodeList": [], "childListNum": 0}];
        }

        vm.addProcess = (index, groupName) => {
            DialogService.modal({
                key: 'addGroupName',
                url: 'business/components/flow/create/addGroupName/addGroupName.html',
            }, {
                key: 'addGroupName',
                data: {
                    msg: 'this is data from modalCtrl!',
                    index: index,
                    groupName: groupName,
                    opt:'add',
                    nodeGroupList:vm.nodeGroupList,
                    callback: vm.addGroupName
                }
            });
        }

        vm.addGroupName = (index, groupName)=> {
            vm.nodeGroupList.pop();
            vm.nodeGroupList.splice(index + 1, 0, {
                "groupName": groupName,
                "groupType": 1,
                "flowNodeList": [],
                "childListNum": 0
            });
            vm.nodeGroupList.push({"groupName": "结束", "groupType": -1, "flowNodeList": [], "childListNum": 0});
        }

        vm.editProcess = (index, groupName) => {
            DialogService.modal({
                key: 'addGroupName',
                url: 'business/components/flow/create/addGroupName/addGroupName.html',
            }, {
                key: 'addGroupName',
                data: {
                    msg: 'this is data from modalCtrl!',
                    index: index,
                    opt:'edit',
                    groupName: groupName,
                    nodeGroupList:vm.nodeGroupList,
                    callback: vm.updateGroupName
                }
            });
        }

        vm.updateGroupName = (index, groupName)=> {
            vm.nodeGroupList[index].groupName = groupName;
            vm.nodeGroupList[index].groupType = 1;
        }

        vm.deleteProcess = (index)=> {
            vm.nodeGroupList.splice(index, 1);
        }

        vm.addTask = (index)=> {
            DialogService.modal({
                key: 'taskList',
                url: 'business/components/flow/create/taskList/taskList.html',
            }, {
                key: 'taskList',
                data: {
                    msg: 'this is data from modalCtrl!',
                    index: index,
                    flow: vm.flow,
                    sysList: vm.sysList,
                    flowNodeList:vm.nodeGroupList[index].flowNodeList,
                    callback: function (taskList) {
                        if (!vm.nodeGroupList[index].flowNodeList) {
                            vm.nodeGroupList[index].flowNodeList = [];
                        }
                        vm.nodeGroupList[index].flowNodeList = vm.nodeGroupList[index].flowNodeList.concat(taskList);
                    }
                }
            });

        }

        vm.change = (d) => {
            if (d === 1) {
                vm.isFirst = true;
                vm.isSecond = false;
                vm.initNum = 1;
            }
            if (d === 2) {
                vm.isFirst = false;
                vm.isSecond = true;
                vm.initNum = 2;
            }

        }
        //下一步 
        vm.nextStep = () => {
            vm.isFirst = false;
            vm.isSecond = true;
            vm.initNum = 2;
        }
        //上一步 
        vm.previousStep = () => {
            vm.isFirst = true;
            vm.isSecond = false;
            vm.initNum = 1;
        }
        //删除当前任务或参数
        vm.deleteTask = (num, flowNodeList) => {
            flowNodeList.splice(num, 1);
        }

        vm.save = ()=> {
            //参数验证
            if (!vm.flowForm.$valid) {
                return;
            }
            if (!vm.nodeGroupList || vm.nodeGroupList.length < 3) {
                AlertService.alert({title: "提示", content: "请至少添加一个阶段！"});
                return;
            }

            var flowVo = {};
            flowVo.flow = vm.flow;
            flowVo.nodeGroupList = vm.nodeGroupList;
            var hasTask = true;
            angular.forEach(vm.nodeGroupList, function (it, idx) {
                if (it.groupType == 1 && (!it.flowNodeList || it.flowNodeList.length < 1)) {
                    hasTask = false;
                    return false;
                }
            });

            if (!hasTask) {
                AlertService.alert({title: "提示", content: "阶段至少需要选择一个任务！"});
                return;
            }

            HttpService.post('flow/save', flowVo).then(function (result) {
                AlertService.alert({title: "提示", content: "创建交付流水线成功！"});
                $state.go('topHead.leftColumn.navheadDetail.flowList',{sysId:paramsSysId});
            });

        }

        //取消
        vm.cancel = () => {
            $state.go('topHead.leftColumn.navheadDetail.flowList',{sysId:paramsSysId});
        }

        //动态判断代码库是否重名
        vm.isFlowNameRepeat = () => {
            if (!vm.flow.flowName) {
                return;
            }
            var params = {
                flowName: vm.flow.flowName
            }
            HttpService.post('flow/exists', params,{notDisplayLoading: true}).then(function (result) {
                vm.flowNameRepeat = result;
            });

        }
    }
}

export default app => app.controller('FlowCreateCtrl', FlowCreateCtrl)
