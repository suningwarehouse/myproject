import {
    Inject
} from 'business/decorator/decorator';

@Inject
class deploymentManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter) {
        let vm = $scope;

        /**********************************************************************************************/
        vm.statusList = [
                       {id:1,value:"开发中"},
                       {id:2,value:"已封版"},
                       {id:3,value:"已发布"},
                       {id:4,value:"已归档"},
                       {id:0,value:"已删除"},
                   ];
        
        onLoadPage();
        
        function onLoadPage(){

        	HttpService.get('deployments/').then(d=>{
        		if(null == d.deploymentBOListRespVO){
        			vm.deploymentBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.deploymentBOListRespVO = d.deploymentBOListRespVO.theListData;
	        		vm.total = d.deploymentBOListRespVO.totalSize;
	        		vm.pageSize = d.deploymentBOListRespVO.pageSize;
	        		vm.page = d.deploymentBOListRespVO.currentPage;
        		}
        	});
        	
//        	HttpService.get('deployments/appName').then(d=>{
//        		vm.appNameList = d.appNameList;
//        	});
        	
        	vm.odin3Url='http://odinsit.cnsuning.com';
            
            if (location.hostname.match('sit')) {
            	vm.odin3Url = "http://odinsit.cnsuning.com";
            } else if (location.hostname.match("dev")) {
            	vm.odin3Url = "http://10.24.40.170:8080";
            } else if (location.hostname.match('pre')) {
            	vm.odin3Url = "http://odinsit.cnsuning.com";
            } else {
            	vm.odin3Url = "http://odin.cnsuning.com";
            }
        };
        
        vm.search = {};
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	
        	var params = {
        			appName:vm.search.appName,
        			result:vm.search.result,
	        		page:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
        	HttpService.get('deployments/',params).then(d=>{
				if(null == d.deploymentBOListRespVO){
        			vm.deploymentBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.deploymentBOListRespVO = d.deploymentBOListRespVO.theListData;
	        		vm.total = d.deploymentBOListRespVO.totalSize;
	        		vm.pageSize = d.deploymentBOListRespVO.pageSize;
	        		vm.page = d.deploymentBOListRespVO.currentPage;
        		}
			})
        };
        
        vm.doSearch = () => {
        	var params = {
        			appName:vm.search.appName,
	        	};
        	
			HttpService.get('deployments/',params).then(d=>{
				if(null == d.deploymentBOListRespVO){
        			vm.deploymentBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.deploymentBOListRespVO = d.deploymentBOListRespVO.theListData;
	        		vm.total = d.deploymentBOListRespVO.totalSize;
	        		vm.pageSize = d.deploymentBOListRespVO.pageSize;
	        		vm.page = d.deploymentBOListRespVO.currentPage;
        		}
			})
		};
		
		vm.select2DeploymentResult={};
        vm.doReset = () => {
        	vm.search.appName = '';
        	vm.deploymentResult=undefined;
        	vm.select2DeploymentResult.reset();
        };
    }
}

export default app => {
    app.controller('deploymentManage', deploymentManage);
};