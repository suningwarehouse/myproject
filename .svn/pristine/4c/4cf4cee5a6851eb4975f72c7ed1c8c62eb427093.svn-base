import {
    Inject
} from 'business/decorator/decorator'

@Inject
class appManageCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService) {
        let vm = $scope;
		vm.status=$stateParams.status;
        // 分页
        vm.page = 0;
        vm.pageSize = 10;
        
        init();
        function init(){
        	SearchAppByPage(vm.page,vm.pageSize);
        	
        	vm.jiraUrl='http://10.37.55.28:8080';
            
            if (location.hostname.match('sit')) {
            	vm.jiraUrl = "http://10.37.55.28:8080";
            } else if (location.hostname.match("dev")) {
            	vm.jiraUrl = "http://10.37.55.28:8080";
            } else if (location.hostname.match('pre')) {
            	vm.jiraUrl = "http://newjira.cnsuning.com";
            } else {
            	vm.jiraUrl = "http://newjira.cnsuning.com";
            }
    	}



   	    vm.statusList=[
   	                {"value":"已注销","id":"0"},
	                {"value":"运行中","id":"1"}
   	               ];
   	    
	   	 vm.statusList.find(function (x) {
	         if(x.id+'' === vm.status){
	         	vm.thestatus = x;
	         }
	     })
	     
	     vm.onChangeSlelectStatus = (thestatus) => {
	    	 if(thestatus == null){
				vm.status = '';
	    	 }else{
				vm.status = thestatus.id;
	    	 }
	     };
	     vm.select2Status={};
	     vm.reset=()=>{
	            vm.appName='';
	            vm.status='';
	            vm.pageIndex=0;
	            vm.pageSize=10;
	            vm.thestatus='';
				vm.select2Status.reset();
	            SearchAppByPage(vm.pageIndex,vm.pageSize);
	        }
	     
		 vm.doSearch = () => {
			SearchAppByPage(vm.page,vm.pageSize);
		 }
        function SearchAppByPage(page,pageSize){
    		var params= {
    				page: page,
                    pageSize: pageSize,
                    status :vm.status,
                    appName:vm.appName
            }
    		HttpService.post('app/search?page='+params.page+'&pageSize='+params.pageSize,params).then(result => {
   			 	vm.page = result.page;
                vm.pageSize = result.pageSize;
                vm.totalCount=result.totalCount;
                vm.appList = result.data;
				vm.appList.forEach(e=>{
					if(e.appAdmin){
						e.appAdmin = e.appAdmin.split(' ')[0];

					}
					
				})
        	});
    		
    		HttpService.get('app/getItpUrl').then(result => {
    			  vm.itpUrl=result+'/processDraftFilter.do?businessTemplateId=NSOA2050';
        	});
    	}
        
        
// vm.setSession=(appId,appName)=>{
// sessionStorage.setItem("appId", appId);
// sessionStorage.setItem("appName", appName);
// }
        
        vm.paging1 = (pageArg, pageSizeArg, totalArg) => {
        	SearchAppByPage(pageArg,pageSizeArg);
        	  console.log(pageArg, pageSizeArg, totalArg);
        };

       $scope.showDialog = () => {
    	   window.open(vm.itpUrl);
        };

   
        vm.showCreateFlowDialog = () =>{
        	DialogService.modal({
	            key: '新增流水线',
	            url: 'business/components/branchDetails/flowManage/createFlowWithoutSystem/createFlowWithoutSystem.html',
	            accept: (result) => {
	                console.log(result);
	            },
	            refuse: (reason) => {
	                console.log(reason);
	            }
	            }, {
	            key: '新增流水线',
	            data: {msg: 'this is data from modalCtrl!'}
            });
        }
    }
}

export default app => app.controller('appManageCtrl', appManageCtrl)
7

