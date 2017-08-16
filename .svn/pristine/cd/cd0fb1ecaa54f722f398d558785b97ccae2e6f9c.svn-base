import {
    Inject
} from 'business/decorator/decorator'

import taskDataCtrl from './taskData/taskData';
@Inject
class editTaskCtrl {
    constructor($scope, $state,$filter,DialogService, HttpService, $stateParams,userService,$q,$timeout) {
        let vm = $scope;
		vm.getandupdate = num => {
            return userService.getAndUpdateUser(num).then(d => {
                d = d.filter(function (e) {
                    return e.code === num
                })
                d.forEach(e => {
                    e.id = e.code;
                    e.text = e.name
                })
                return d
            })
        }

		$scope.$watch("notifierRepeat", (newValue, oldValue) => {
	                
	                        getNotifier();
	    }, true)
        let formData=vm.formData={};
 
    	vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
  
        vm.action =$stateParams.type;
        vm.taskId =$stateParams.taskId;
        
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
	        { href: "/#/securityScanTask", title: "安全扫描" },
	        { href: "", title: vm.titleDesc }
        ];
    
        
        
        
		vm.show=false;
		
        let names = ['notifier'];
        
        
        vm.checkType='0';
        vm.delay='0';
    	init();
    	//初始化
    	function init(){
    		//初始化用户
            userService.getSelectUsers().then(function (result) {
               vm.users = result;
               vm.users.forEach(e => {
                   e.text = e.name;
                   e.id = e.code
           		});
           		if(vm.action!='create'){
           			getTaskByTaskId(vm.taskId);
           		}else{
           			vm.task={};
					vm.notifierRepeat=[];
           		 
           		}
			});
			
    		
    		
            vm.taskNameExist=false;
            vm.commited = false;
        	//获取reposName和当前日期
            vm.defaultTaskName=vm.appName+'_'+$filter("date")(new Date(), "yyyyMMdd");
            vm.taskName =vm.defaultTaskName;
        	if(vm.action=='create'){
	            HttpService.get('test/task/tracker/'+vm.appId+'/'+vm.taskName+'/exist').then(d => {
	      		  vm.taskNameExist=d;
	            });
        	}
        	
        	 
        	
                 
                 
         }
    		
 
	  
    	function getTaskByTaskId(taskId){

    		HttpService.get('test/task/tracker/'+taskId).then(result => {
				  vm.task =result;

				  if(vm.task.login){
					 vm.login=vm.task.login;
				  }
				  
				  //select2赋值
	                names.forEach(e => {
	                    let repeat = vm[e + 'Repeat'] = []
	                    vm.task[e + 'List'] && vm.task[e + 'List'].forEach(d => {
	                        repeat.push(vm.users.find(n => n.code === d))
	                    })
	                  
	                })
	                
	                vm.show =true;
  		});
    		
    	}
    	  function strToJson(str){ 
          	var json = (new Function("return " + str))(); 
          	return json; 
          }
		//添加用户
    	 vm.addUser = (index) => {
			vm.login.splice(index+1,0,{})
    	 }
		 //添加用户
		 vm.reduceUser = (index) => {
			  vm.login.splice(index, 1);
    	 }
		 

		 function getNotifier (){
			 if(vm.notifierRepeat && vm.notifierRepeat.length>0){
				 vm.commited=true;
			 }else{
				 vm.commited=false;
			 }
		 }
		 
        //关闭
        vm.close = () => {
        	  $state.go('topHead.leftColumn.securityScanTask');
        };
     

        //创建
        vm.commit = () => {
			vm.notifierList = [];
			vm.notifierRepeat && vm.notifierRepeat.forEach(e =>{
				vm.notifierList.push(e.code);
			})
        	
        	if(vm.login && vm.login.userName){
        		vm.login1=JSON.stringify(vm.login);
        	}
        	
        	if(!vm.taskNameExist){
        		vm.commited = false;
        		if(vm.action=='create'){
		    		HttpService.post('test/task/tracker/'+vm.appId+'/create', {
		    			appId:vm.appId,
		            	taskName: vm.taskName,
		            	url:vm.url,
		            	delay:vm.delay,
		            	checkType:vm.checkType,
		            	login: vm.login1,
		            	notifier:JSON.stringify(vm.notifierList),
		            	description: vm.description,
		            }).then(d => {
		                alert('创建成功!!');
		                $state.go('topHead.leftColumn.securityScanTask');
		            },d => {
		            	vm.commited = true;
		            });
        		}else{
        			HttpService.post('test/task/tracker/'+vm.appId+'/update', {
		    			taskId:vm.task.taskId,
		    			url:vm.task.url,
		            	delay:vm.task.delay,
		            	checkType:vm.task.checkType,
		            	login: vm.login1,
		            	notifier:JSON.stringify(vm.notifierList),
		            	description: vm.task.description
		            }).then(d => {
		                alert('修改成功!!');
		                $state.go('topHead.leftColumn.securityScanTask');
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
        	  HttpService.get('test/task/tracker/'+vm.appId+'/'+vm.taskName+'/exist').then(d => {
        		  vm.taskNameExist=d;
              })
        };
        
       vm.showTaskData = () =>{
    	   var type=vm.checkType;
    		if(vm.action!='create'){
    			type=vm.task.checkType;
    		}
        	DialogService.modal({
                key: 'taskData',
                url: 'business/components/test/tracker/editTask/taskData/taskData.html',
                accept: (result) => {
                    console.log(result);
                    init();
                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'taskData',
                data: {
                    msg: 'this is data from modalCtrl!',
                    checkType:type
                }
            });
        }
   
    }
}



export default app => {
    app.controller('editTaskCtrl', editTaskCtrl);
    INCLUDE_ALL_MODULES([taskDataCtrl], app)
    
};