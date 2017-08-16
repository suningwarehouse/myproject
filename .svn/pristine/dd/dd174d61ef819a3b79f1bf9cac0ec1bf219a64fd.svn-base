import {
    Inject
} from 'business/decorator/decorator';

@Inject
class integrationManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter) {
        let vm = $scope;

        vm.integrationResultList = [
                       {id:"成功",value:1},
                       {id:"失败",value:2},
                   ];
        
        onLoadPage();
        
        function onLoadPage(){
        	HttpService.get('integration/').then(d=>{
        		if(null == d.integrationBOListRespVO){
        			vm.integrationBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.integrationBOListRespVO = d.integrationBOListRespVO.theListData;
	        		vm.total = d.integrationBOListRespVO.totalSize;
	        		vm.pageSize = d.integrationBOListRespVO.pageSize;
	        		vm.page = d.integrationBOListRespVO.currentPage;
        		}
        	});
        	
        	vm.uranusUrl='http://uranussit.cnsuning.com';
            
            if (location.hostname.match('sit')) {
            	vm.uranusUrl = "http://uranussit.cnsuning.com";
            } else if (location.hostname.match("dev")) {
            	vm.uranusUrl = "http://uranussit.cnsuning.com";
            } else if (location.hostname.match('pre')) {
            	vm.uranusUrl = "http://uranus.cnsuning.com";
            } else {
            	vm.uranusUrl = "http://uranus.cnsuning.com";
            }
            
            vm.buildOrderList=[];
            HttpService.get("/common/queryUranusDictList/3").then(function (result) {
                vm.buildOrderList = result;
            });
        };
        
        vm.onChangeSlelectResult = (improvementResult) => {
        	vm.search.result = improvementResult.value;
        }
        
        vm.search = {};
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	
        	var params = {
        			taskName:vm.search.taskName,
        			systemName:vm.search.systemName,
        			result:vm.search.result,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
			HttpService.get('integration/',params).then(d=>{
				if(null == d.integrationBOListRespVO){
        			vm.integrationBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.integrationBOListRespVO = d.integrationBOListRespVO.theListData;
	        		vm.total = d.integrationBOListRespVO.totalSize;
	        		vm.pageSize = d.integrationBOListRespVO.pageSize;
	        		vm.page = d.integrationBOListRespVO.currentPage;
        		}
        	})
        };
        
        vm.doSearch = () => {
        	var params = {
        			taskName:vm.search.taskName,
        			systemName:vm.search.systemName,
        			result:vm.search.result
	        	};
        	
			HttpService.get('integration/',params).then(d=>{
				if(null == d.integrationBOListRespVO){
        			vm.integrationBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.integrationBOListRespVO = d.integrationBOListRespVO.theListData;
	        		vm.total = d.integrationBOListRespVO.totalSize;
	        		vm.pageSize = d.integrationBOListRespVO.pageSize;
	        		vm.page = d.integrationBOListRespVO.currentPage;
        		}
			})
		};
		
		/*vm.select2IntegrationResult = {};
        vm.doReset = () => {
        	vm.integrationResult = undefined;
			vm.select2IntegrationResult.reset();
        };*/
		
		vm.search={};
        vm.doReset = () => {
        	vm.search.taskName='';
        	vm.search.systemName='';
        };
    }
}

export default app => {
    app.controller('integrationManage', integrationManage);
};