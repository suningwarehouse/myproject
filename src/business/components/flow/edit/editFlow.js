/**
 * Created by 17030515 on 2017/5/30.
 */
import {
    Inject
} from 'business/decorator/decorator'
import addGroupName from '../create/addGroupName/addGroupName';

@Inject
class FlowEditCtrl {
    constructor($scope,HttpService,DialogService,$stateParams, $state,AlertService, $q, $rootScope) {
        let vm = $scope;
        let paramsSysId=$stateParams.sysId;
        vm.initNum = 2;
        init();
        vm.flow={};
        vm.sysList=[];
        function init(){
            HttpService.get('flow/listSystemByLoginUser').then(function (result) {
                vm.sysList = result;
            });

            HttpService.get('flow/getDetail/'+$stateParams.flowId).then(function (result) {
                vm.flow=result.flow;
                vm.nodeGroupList=result.nodeGroupList;
            });
        }

        vm.crumbBaseData = [
            { href: "/", title: "首页" },
            { href: "/#/flowList/"+paramsSysId, title: "交付流水线" },
            { href: "", title: "修改流水线" }
        ];

        //vm.nodeGroupList = [{"groupName":"开始","groupType":0,"childList":[],"childListNum":0},{"groupName":"结束","groupType":-1,"childList":[],"childListNum":0}];
        vm.addProcess = (index,groupName) => {
            DialogService.modal({
                key: 'addGroupName',
                url: 'business/components/flow/create/addGroupName/addGroupName.html',
            }, {
                key: 'addGroupName',
                data: {
                    msg: 'this is data from modalCtrl!',
                    index : index,
                    groupName:groupName,
                    opt:'add',
                    nodeGroupList:vm.nodeGroupList,
                    callback:vm.addGroupName
                }
            });
        }

        vm.addGroupName = (index, groupName)=> {
            //var end=vm.nodeGroupList.pop();
            vm.nodeGroupList.splice(index + 1, 0, {"groupName": groupName ,"groupType":1, "childList": [], "childListNum": 0});
            //vm.nodeGroupList.push(end);
        }

        vm.editProcess = (index,groupName) => {
            DialogService.modal({
                key: 'addGroupName',
                url: 'business/components/flow/create/addGroupName/addGroupName.html',
            }, {
                key: 'addGroupName',
                data: {
                    msg: 'this is data from modalCtrl!',
                    index : index,
                    groupName:groupName,
                    opt:'edit',
                    nodeGroupList:vm.nodeGroupList,
                    callback:vm.updateGroupName
                }
            });
        }

        vm.updateGroupName = (index, groupName)=> {
            vm.nodeGroupList[index].groupName=groupName;
            vm.nodeGroupList[index].groupType=1;
        }

        vm.deleteProcess = (index)=> {
            vm.nodeGroupList.splice(index,1);
        }

        vm.addTask = (index)=> {
            DialogService.modal({
                key: 'taskList',
                url: 'business/components/flow/create/taskList/taskList.html',
            }, {
                key: 'taskList',
                data: {
                    msg: 'this is data from modalCtrl!',
                    index : index,
                    flow:vm.flow,
                    sysList:vm.sysList,
                    flowNodeList:vm.nodeGroupList[index].flowNodeList,
                    callback:function (taskList) {
                        if(!vm.nodeGroupList[index].flowNodeList){
                            vm.nodeGroupList[index].flowNodeList=[];
                        }
                        vm.nodeGroupList[index].flowNodeList=vm.nodeGroupList[index].flowNodeList.concat(taskList);
                    }
                }
            });

        }

        //删除当前任务或参数
        vm.deleteTask = (num,flowNodeList) => {
            flowNodeList.splice(num,1);
        }
        
        vm.viewTaskDetail = (oneList) =>{
        	console.log(oneList);
        	
        	DialogService.modal({
                key: 'viewTaskDetail',
                url: 'business/components/flow/create/viewTaskDetial/viewTaskDetial.html',
                accept: (result) => {
                    console.log(result);
                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'viewTaskDetail',
                data: {
                	task: oneList,
                	sysId:paramsSysId
                }
            });
        };

        vm.save = ()=> {
            if(!vm.nodeGroupList||vm.nodeGroupList.length<3){
                AlertService.alert({title:"提示",content:"请至少添加一个阶段！"});
                return;
            }
            
            var hasTask=true;
            angular.forEach(vm.nodeGroupList,function (it,idx) {
                if(it.groupType==1 && (!it.flowNodeList||it.flowNodeList.length<1)){
                    hasTask=false;
                    return false;
                }
            });

            if(!hasTask){
                AlertService.alert({title:"提示",content:"阶段至少需要选择一个任务！"});
                return;
            }

            var flowVo={};
            flowVo.flow=vm.flow;
            flowVo.nodeGroupList=vm.nodeGroupList;
            flowVo.flow.groupNum=vm.nodeGroupList.length;
            flowVo.flow.taskNum=getTaskNum(vm.nodeGroupList);

            HttpService.post('flow/save',flowVo).then(function (result) {
                AlertService.alert({title:"提示",content:"修改交付流水线成功！"});
                $state.go('topHead.leftColumn.navheadDetail.flowList',{sysId:paramsSysId});
            });

        }

        function getTaskNum(nodeGroupList) {
            var taskNum=0;
            angular.forEach(nodeGroupList,function (it) {
                if(it.flowNodeList&&it.flowNodeList.length>0){
                    taskNum=taskNum+it.flowNodeList.length;
                }

            });
            return taskNum;
        };

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
            HttpService.post('flow/exists',params).then(function (result) {
                vm.flowNameRepeat = result;
            });
        }
    }
}

export default app => app.controller('FlowEditCtrl', FlowEditCtrl)
