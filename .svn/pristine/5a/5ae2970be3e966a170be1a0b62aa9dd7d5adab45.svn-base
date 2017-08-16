import {
    Inject
} from 'business/decorator/decorator'

import taskRecordDetailCtrl from './taskRecordDetail/taskRecordDetail';
@Inject
class taskRecordCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService) {
        let vm = $scope;
    	vm.appId = sessionStorage.getItem("appId");
		
		vm.taskId=$stateParams.taskId;
		vm.taskType=$stateParams.type;
		vm.taskName=$stateParams.taskName;
        //分页
        vm.page = 0;
        vm.pageSize = 10;

        
        init();
        function init(){
      
        	SearchTaskRecordByPage(vm.page,vm.pageSize);
    	}

        if(vm.taskType==3){
        	vm.title="蛙测";
        	vm.titleHref="testTask"
        }else{
        	vm.title="安全扫描";
        	vm.titleHref="securityScanTask"
        }
        // vm.crumbBaseData = [
        //     { href: "/", title: "首页" },
        //     { href: "/#/overview/appManage/", title: "应用管理" },
        //     { href: "/#/"+vm.titleHref, title:vm.title},
        //     { href: "", title: vm.title+"历史记录" }
        // ];

	        
        function SearchTaskRecordByPage(page,pageSize){
        
    		var params= {
            		page: page,
                    pageSize: pageSize,
                    taskType:vm.taskType,
                    taskId:vm.taskId
            }
    		HttpService.post('test/task/search/taskRecord/'+vm.taskType+"/"+vm.taskId,params).then(result => {
   			 	vm.page = result.page;
                vm.pageSize = result.pageSize;
                vm.totalCount=result.totalCount;
                vm.taskRecordList = result.data;
        	});
    	}
        
      
        vm.showDetail = (taskRecord) => {
        	DialogService.modal({
                key: 'showDetail',
                url: 'business/components/test/taskRecord/taskRecordDetail/taskRecordDetail.html',
                accept: (result) => {
                    console.log(result);
                    init();
                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'showDetail',
                data: {
                    msg: 'this is data from modalCtrl!',
                    taskRecord:taskRecord
                }
            });
        
        };
      
        //关闭
        vm.close = () => {
        	if(vm.taskType=='3'){
        	  $state.go('topHead.leftColumn.testTask');
        	}else if(vm.taskType=='4'){
        		$state.go('topHead.leftColumn.securityScanTask');
        	}
        };
        
        vm.paging1 = (pageArg, pageSizeArg, totalArg) => {
        	SearchTestTaskByPage(pageArg,pageSizeArg);
        	  console.log(pageArg, pageSizeArg, totalArg);
        };

    }
}

export default app => {
    app.controller('taskRecordCtrl', taskRecordCtrl)
    INCLUDE_ALL_MODULES([taskRecordDetailCtrl], app)
};


