import {
    Inject
} from 'business/decorator/decorator'
import editTaskCtrl from './editTask/editTask';
@Inject
class testTaskCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService) {
        let vm = $scope;
		
    	vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
		
        //分页
        vm.page = 0;
        vm.pageSize = 10;
      
        
	// vm.crumbBaseData = [
	//                     { href: "/", title: "首页" },
	//                     { href: "/#/overview/appManage/", title: "应用管理" },
	//                     { href: "", title: "蛙测" }
	//                 ];

    vm.statusList=[
   	                {"name":"已废弃","value":0},
	                {"name":"使用中","value":1}
   	               ];
        
        init();
        function init(){
        	vm.status=1;
        	SearchTestTaskByPage(vm.page,vm.pageSize);
    	}

       
	        
        function SearchTestTaskByPage(page,pageSize){
        
    		var params= {
            		page: page,
                    pageSize: pageSize,
                    status :vm.status,
                    appId:vm.appId,
                    taskName:vm.taskName,
                    envName:vm.envName
            }
    		
    		HttpService.get('test/task/scts/getTasks/'+vm.appId).then(d => {
                vm.tasks = d;
            })
            
    		HttpService.post('test/task/search/scts/'+vm.appId+'?page='+params.page+'&pageSize='+params.pageSize,params).then(result => {
   			 	vm.page = result.page;
                vm.pageSize = result.pageSize;
                vm.totalCount=result.totalCount;
                vm.taskList = result.data;
        	});
    	}
        
      
       
            
            vm.delete = d =>{
            	//检查流水线有无执行信息
            	var params={
            			taskId:d.taskId,
            			taskType:3
            	}
            	HttpService.post('flow/task/verification',params).then(result => {
            			if(result){
            				alert("有流水线任务正在执行,不能删除")
            			}else{
            				if(confirm("确认删除？")){
            	    	       	 HttpService.delete('test/task/scts/'+d.taskId+'/'+d.taskName+'/delete').then(d => {
            	    	            }).then(d => {
            	                        alert('删除成功');
            	                        init();
            	                    })
            	            }
            			}
            	});
           }
            
        vm.search =()=>{
        	 SearchTestTaskByPage(vm.page,vm.pageSize);
        }
        vm.reset=()=>{
            vm.taskName='';
            vm.envName='';
            vm.status=1;
            vm.page=0;
            vm.pageSize=10;
            SearchTestTaskByPage(vm.page,vm.pageSize);
        }
      
        
        vm.paging1 = (pageArg, pageSizeArg, totalArg) => {
        	SearchTestTaskByPage(pageArg,pageSizeArg);
        	  console.log(pageArg, pageSizeArg, totalArg);
        };

    }
}

export default app => {
    app.controller('testTaskCtrl', testTaskCtrl)
    INCLUDE_ALL_MODULES([editTaskCtrl], app)
};


