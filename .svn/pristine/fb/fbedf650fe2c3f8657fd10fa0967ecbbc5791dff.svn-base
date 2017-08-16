import {
    Inject
} from 'business/decorator/decorator';

@Inject
class improvementManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter) {
        let vm = $scope;

        onLoadPage();
        
        function onLoadPage(){
        	HttpService.get('improvements/').then(d=>{
        		if(null == d.improvementBOListRespVO){
        			vm.improvementBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.improvementBOListRespVO = d.improvementBOListRespVO.theListData;
	        		vm.total = d.improvementBOListRespVO.totalSize;
	        		vm.pageSize = d.improvementBOListRespVO.pageSize;
	        		vm.page = d.improvementBOListRespVO.currentPage;
        		}
        	});
        	
//        	HttpService.get('improvements/appName').then(d=>{
//        		vm.appNameList = d.appNameList;
//        	});
        	
        	vm.neptuneUrl='http://neptunesit.cnsuning.com';
            
            if (location.hostname.match('sit')) {
            	vm.neptuneUrl = "http://neptunesit.cnsuning.com";
            } else if (location.hostname.match("dev")) {
            	vm.neptuneUrl = "http://10.24.40.170:8080";
            } else if (location.hostname.match('pre')) {
            	vm.neptuneUrl = "http://neptunesit.cnsuning.com";
            } else {
            	vm.neptuneUrl = "http://neptune.cnsuning.com";
            }
            vm.newNeptuneUrl=vm.neptuneUrl+"/#/myQuality";
        };
        
        vm.search = {};
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	
        	var params = {
        			appName:vm.search.appName,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
			HttpService.get('improvements/',params).then(d=>{
				if(null == d.improvementBOListRespVO){
        			vm.improvementBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.improvementBOListRespVO = d.improvementBOListRespVO.theListData;
	        		vm.total = d.improvementBOListRespVO.totalSize;
	        		vm.pageSize = d.improvementBOListRespVO.pageSize;
	        		vm.page = d.improvementBOListRespVO.currentPage;
        		}
        	})
        };

        vm.doSearch = () => {
        	var params = {
        			appName:vm.search.appName
	        	};
        	
			HttpService.get('improvements/',params).then(d=>{
				if(null == d.improvementBOListRespVO){
        			vm.improvementBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.improvementBOListRespVO = d.improvementBOListRespVO.theListData;
	        		vm.total = d.improvementBOListRespVO.totalSize;
	        		vm.pageSize = d.improvementBOListRespVO.pageSize;
	        		vm.page = d.improvementBOListRespVO.currentPage;
        		}
        	})
		};
        
        vm.doReset = () => {
        	vm.search.appName = '';
        };
    }
}

export default app => {
    app.controller('improvementManage', improvementManage);
};