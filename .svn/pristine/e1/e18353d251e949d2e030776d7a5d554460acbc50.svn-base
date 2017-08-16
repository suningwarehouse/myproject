import {
    Inject
} from 'business/decorator/decorator'

@Inject
class editTestTaskCtrl {
    constructor($scope, $filter,DialogService, HttpService, $stateParams,$state) {
        let vm = $scope;
        let formData=vm.formData={};
 
    	vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
        vm.action =$stateParams.type;
        vm.taskId=$stateParams.taskId;
        
    	init();
    	if(vm.action=='create'){
			vm.titleDesc="创建任务";
			vm.commitDesc="提交";
		}else if(vm.action=='edit'){
			vm.titleDesc="修改任务";
			vm.commitDesc="修改";
		}else{
			vm.titleDesc="任务详情";
		}
    
    	vm.crumbBaseData = [
    	                    { href: "/", title: "首页" },
    	                    { href: "/#/overview/appManage/", title: "应用管理" },
    	                    { href: "/#/testTask", title: "蛙测" },
    	                    { href: "", title: vm.titleDesc },
    	];
    	//初始化
    	function init(){
    		if(vm.action=='create'){
	    		//获取该应用的测试任务列表
	    		HttpService.get('test/task/scts/getTasks/'+vm.appId).then(d => {
	                vm.tasks = d;
	            })
    		}else{
    			getTaskByTaskId(vm.taskId);
    		}
    		vm.commited = true;
    		
    		
    		
    		
            vm.taskNameExist=false;
         
        	//获取reposName和当前日期
            vm.defaultTaskName=vm.appName+'_'+$filter("date")(new Date(), "yyyyMMdd");
            vm.taskName =vm.defaultTaskName;
        	if(vm.action=='create'){
	            HttpService.get('test/task/scts/'+vm.appId+'/'+vm.taskName+'/exist').then(d => {
	      		  vm.taskNameExist=d;
	            });
        	}
    	}
    	
    	  function strToJson(str){ 
          	var json = (new Function("return " + str))(); 
          	return json; 
          }
    
    	  
    	  function getTaskByTaskId(taskId){

      		HttpService.get('test/task/scts/'+taskId).then(result => {
      			vm.task=result;
      			formData.description=vm.task.description;
      		})
    	  }
       
        //关闭
        vm.close = () => {
        	  $state.go('topHead.leftColumn.testTask');
        };
     

        //创建
        vm.commit = () => {
        	if(!vm.taskNameExist){
        		vm.commited = false;
        		
        		if(vm.action=='create'){
		    		HttpService.post('test/task/scts/'+vm.appId+'/create', {
		    			appId:vm.appId,
		            	taskName: vm.taskName,
		            	description: formData.description,
		            	sctsTaskName: formData.task.sctsTaskName,
		            	sctsTaskUuid: formData.task.sctsTaskUuid,
		            	envName:formData.task.envName
		            }).then(d => {
		                alert('创建成功!!');
		                $state.go('topHead.leftColumn.testTask');
		            },d => {
		            	vm.commited = true;
		            });
        		}else{
        			HttpService.post('test/task/scts/'+vm.appId+'/update', {
		    			taskId:vm.task.taskId,
        				appId:vm.appId,
		            	description: formData.description
		            }).then(d => {
		                alert('修改成功!!');
		                $state.go('topHead.leftColumn.testTask');
		            },d => {
		            	vm.commited = true;
		            });
        		}
        	}else{
        		alert("任务已经存在");
        	}
        };
        
       
        //任务名称是否存在
        vm.taskCheck = () =>{
        	  HttpService.get('test/task/scts/'+vm.appId+'/'+vm.taskName+'/exist').then(d => {
        		  vm.taskNameExist=d;
              })
        };
   
    }
}

export default app => app.controller('editTestTaskCtrl', editTestTaskCtrl);