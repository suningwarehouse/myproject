import {
    Inject
} from 'business/decorator/decorator'
@Inject
class editAppPackageCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService) {
        let vm = $scope;
        let formData=vm.formData={};
		vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
        vm.packageId =  $scope.data.packageId;
		vm.action=$scope.data.action;
		vm.isPackageUse=$scope.data.isPackageUse;
		//初始化数据
	    vm.packageNameExist=false;
	    vm.packageCnNameExist=false;
	    vm.commited = true;
	    vm.hasRepos=false;
	    vm.typeIndShow=false;
	    vm.reposIndShow=false;
	    vm.reasonList=[
	   	                {"name":"外部项目无需代码托管","value":"0"},
		                {"name":"仅使用构建,无需生命周期管理","value":"1"},
		                {"name":"不使用自动化部署","value":"2"},
		                {"name":"其他原因不需要代码托管","value":"3"}, 
		                {"name":"其他原因","value":"4"}
	   	               ];
		formData.relationRepos=true;
		
        init();
        function init() {
        	
        	vm.showReposReason=false;
        	if(vm.action=='create'){
        		vm.titleDesc="创建应用部署单元";
        	}else{
        		vm.titleDesc="修改应用部署单元";
        	}
        	
        	//获取应用的代码库列表
        	HttpService.get('appPackage/getRepos/'+vm.appId).then(d => {
        		vm.reposList=strToJson(d);
        		if(vm.reposList && vm.reposList.length>0){
        			vm.hasRepos=true;
        		}
        		
        		if(formData.relationRepos && !vm.hasRepos){
            		vm.commited=false;
            	}else{
            		vm.commited=true;
            	}
        		
        		if(vm.packageId){
            		HttpService.get('appPackage/'+vm.packageId).then(d => {
              		  vm.packageInfo=d;
              		  if(vm.packageInfo.relationRepos==1){
                  		  formData.relationRepos=true;
              		  }else{
              			  formData.relationRepos=false;
              		  }

              		  formData.packageName= vm.packageInfo.packageName;
              		  formData.packageCnName=vm.packageInfo.packageCnName;
              		  vm.oldPackageName= angular.copy(vm.packageInfo.packageName);
              		  vm.oldPackageCnName =angular.copy(vm.packageInfo.packageCnName);
              		  if(d.reposId && vm.reposList){
              			vm.reposList.forEach(function(item){
              				if(item.reposId==d.reposId){
              					formData.reposRef=item;
              					vm.showReposReason=true;
              				}
              			});
              		  }else{
              			  vm.showReposReason=true;
              		  }
              		
              		  if(!formData.relationRepos){
              			formData.reason=vm.packageInfo.reason;
              			vm.commited=true;
              			}
                    })
            	}else{
            		vm.showReposReason=true;
            	}
        		
        	});
        	
        	
        }

        
        
        function strToJson(str){ 
        	var json = (new Function("return " + str))(); 
        	return json; 
        }
        
        
        
        //应用包名称是否存在
        vm.packageCheck = () =>{
        	
        	  HttpService.get('appPackage/'+vm.appId+'/'+formData.packageName+'/exist').then(d => {
        		  if(d && d.length>0){
        			  if(vm.action=='create'){
        				  vm.packageNameExist=true;
        			  }else if (vm.oldPackageName==formData.packageName){
        				  vm.packageNameExist=false;
        			  }else{
        				  vm.packageNameExist=true;
        			  }
        		  }else{
        			  vm.packageNameExist=false;
        		  }
              })
        };
        
        
        //应用包名称是否存在
        vm.packageCnNameCheck = () =>{
        	  HttpService.get('appPackage/'+vm.appId+'/'+formData.packageCnName+'/packageCnName/exist').then(d => {
        		  if(d && d.length>0){
        			  if(vm.action=='create'){
        				  vm.packageCnNameExist=true;
        			  }else if (vm.oldPackageCnName==formData.packageCnName){
        				  vm.packageCnNameExist=false;
        			  }else{
        				  vm.packageCnNameExist=true;
        			  }
        		  }else{
        			  vm.packageCnNameExist=false;
        		  }
              })
        };
        
        vm.showCommit = () => {
        	if(formData.relationRepos && !vm.hasRepos){
        		vm.commited=false;
        	}else{
        		vm.commited=true;
        	}
        }
        //关闭
        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };
     
        //创建
        vm.commit = () => {
        	if(formData.reposRef && formData.reposRef.reposName){
        		vm.reposName=formData.reposRef.reposName;
        	}
        	if(formData.reposRef && formData.reposRef.reposId){
        		vm.reposId=formData.reposRef.reposId;
        	}
        	var relationRepos=0
        	if(formData.relationRepos){
        		relationRepos=1;
        	}
        	if(!vm.packageNameExist && !vm.packageCnNameExist){
        		vm.commited = false;
        		if(vm.action=='create'){
		    		HttpService.post('appPackage/'+vm.appId+'/create', {
		    			appId:vm.appId,
		            	packageName: formData.packageName,
		            	packageCnName: formData.packageCnName,
		            	reposName:vm.reposName,
		            	reposId:vm.reposId,
		            	description: formData.description,
		            	relationRepos:relationRepos,
		            	reason:formData.reason
		            }).then(d => {
		                alert('创建成功!!');
		                DialogService.accept(vm.key, 'dialog accept!');
		            },d => {
		            	vm.commited = true;
		            });
        		}else{
        			HttpService.post('appPackage/'+vm.appId+'/update', {
        				packageId:vm.packageId,
        				appId:vm.appId,
		            	packageName: formData.packageName,
		            	packageCnName:formData.packageCnName,
		            	status:vm.packageInfo.status,
		            	reposName:vm.reposName,
		            	reposId:vm.reposId,
		            	description: vm.packageInfo.description,
		            	relationRepos:relationRepos,
		            	reason:formData.reason
		            }).then(d => {
		                alert('修改成功!!');
		                DialogService.accept(vm.key, 'dialog accept!');
		            },d => {
		            	vm.commited = true;
		            });
        		}
        	}else{
        		alert("请检查名称是否已经存在,请检查!");
        	}
        };
        
        vm.show = () =>{
        	if(vm.typeIndShow){
        		vm.typeIndShow=false;
        	}else{
        		vm.typeIndShow=true;
        	}
        }
        
        vm.showRepos = () =>{
        	if(vm.reposIndShow){
        		vm.reposIndShow=false;
        	}else{
        		vm.reposIndShow=true;
        		
        	}
        }
    }
}


export default app => {
    app.controller('editAppPackageCtrl', editAppPackageCtrl)
};


