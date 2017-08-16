/**
 * Created by 17030515 on 2017/3/27.
 */
import {
    Inject
} from 'business/decorator/decorator';

@Inject
class viewTaskDetial {
    constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;
        console.log(vm.data.task);
        vm.task = {};
        vm.task.taskName = vm.data.task.taskName;
        vm.task.taskType = vm.data.task.taskType;
        vm.task.taskId = vm.data.task.taskId;
        vm.task.flowId = vm.data.task.flowId;
        vm.task.sysId = vm.data.sysId;
        vm.taskTypeList=[];
        init();
        function init() {
            HttpService.get('dictItem/queryByTypeCode/1').then(d => {
                
                vm.taskTypeList = d;
                vm.taskTypeList.forEach((e,i) =>{
                    if(e.itemCode == vm.task.taskType){
                    	vm.task.taskTypeName=e.itemName;
                    }
                })
            });
            
            if(vm.task.taskType == '2'){
            	 HttpService.get('flow/task/'+vm.task.taskId+'/taskDetial?sysId='+vm.task.sysId).then(d => {
                     
            		 vm.odinTask=d;
                     console.log(d);
                 });
            	 
            	 /*
                 HttpService.get('common/queryVersionList/' + vm.data.flow.sysId).then(d => {
                    
                     vm.versionList = d;
                     console.log(d);
                 });

                 HttpService.get('common/queryBuildConfigList/' + vm.data.flow.sysId).then(d => {
                     
                     vm.buildConfigList = d;
                     console.log(d);
                 });
                 
                 HttpService.get('common/getEnvAndBranch/'+vm.data.flow.sysId+"/" + vm.odinTask.versionId).then(d => {
                     
                	 console.log(d);
                 });*/
            }
        }

        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };
    }
}
export default app => {
    app.controller('viewTaskDetial', viewTaskDetial);
};