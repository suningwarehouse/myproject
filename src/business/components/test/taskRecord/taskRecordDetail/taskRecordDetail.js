import {
    Inject
} from 'business/decorator/decorator'

@Inject
class taskRecordDetailCtrl {
    constructor($scope, $filter,DialogService, HttpService, $stateParams) {
        let vm = $scope;
        let formData=vm.formData={};
 
        vm.taskRecord=$scope.data.taskRecord;
        vm.taskSubRecord=vm.taskRecord.taskSubRecord;
        vm.taskSubRecordMap=vm.taskRecord.taskSubRecordMap;
        vm.reportUrl =vm.taskRecord.reportUrl;
    	init();
    	//初始化
    	function init(){
    		
    		
    	}
    	
    	 
       
        //关闭
        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };
     
        
        
       
   
    }
}

export default app => app.controller('taskRecordDetailCtrl', taskRecordDetailCtrl);