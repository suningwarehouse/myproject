import {
    Inject
} from 'business/decorator/decorator';

@Inject
class repositoryManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter) {
        let vm = $scope;
		
        vm.repositoryStatusList = [
						{id:"ONUSE",value:"在用"},
						{id:"DELETE",value:"废弃"},
						{id:"ALL",value:"全部"},
                   ];
        
        vm.repositoryTypeList = ["SVN","GIT"];
        
        onLoadPage();
        
        function onLoadPage(){
        	HttpService.get('repositories/').then(d=>{
        		if(null == d.repositoryBOListRespVO){
        			vm.repositoryBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.repositoryBOListRespVO = d.repositoryBOListRespVO.theListData;
	        		vm.total = d.repositoryBOListRespVO.totalSize;
	        		vm.pageSize = d.repositoryBOListRespVO.pageSize;
	        		vm.page = d.repositoryBOListRespVO.currentPage;
        		}
        	});
        	
//        	HttpService.get('repositories/appName').then(d=>{
//        		vm.appNameList = d.appNameList;
//        	});
        	
        	vm.saturnUrl='http://saturnsit.cnsuning.com';
            
            if (location.hostname.match('sit')) {
            	vm.saturnUrl = "http://saturnsit.cnsuning.com";
            } else if (location.hostname.match("dev")) {
            	vm.saturnUrl = "http://10.24.40.170:8080";
            } else if (location.hostname.match('pre')) {
            	vm.saturnUrl = "http://saturnsit.cnsuning.com";
            } else {
            	vm.saturnUrl = "http://saturn.cnsuning.com";
            }
            vm.newSaturnUrl= vm.saturnUrl+"/#/editRepos/new";
        };
        
        vm.search = {};
        vm.onChangeSlelectRepertoryStatus = (status) => {
        	if(status == null){
        		vm.search.status = '';
        	}else{
        		vm.search.status = status.id;
        	}
		};
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	
        	var params = {
        			projectName:vm.search.projectName,
        			reposName:vm.search.reposName,
        			reposType:vm.search.reposType,
        			status:vm.search.status,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
			HttpService.get('repositories/',params).then(d=>{
				if(null == d.repositoryBOListRespVO){
        			vm.repositoryBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.repositoryBOListRespVO = d.repositoryBOListRespVO.theListData;
	        		vm.total = d.repositoryBOListRespVO.totalSize;
	        		vm.pageSize = d.repositoryBOListRespVO.pageSize;
	        		vm.page = d.repositoryBOListRespVO.currentPage;
        		}
        	})
        };
        
        vm.doSearch = () => {
        	var params = {
        			projectName:vm.search.projectName,
        			reposName:vm.search.reposName,
        			reposType:vm.search.reposType,
        			status:vm.search.status,
	        	};
        	console.log(params);
			HttpService.get('repositories/',params).then(d=>{
				if(null == d.repositoryBOListRespVO){
        			vm.repositoryBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.repositoryBOListRespVO = d.repositoryBOListRespVO.theListData;
	        		vm.total = d.repositoryBOListRespVO.totalSize;
	        		vm.pageSize = d.repositoryBOListRespVO.pageSize;
	        		vm.page = d.repositoryBOListRespVO.currentPage;
        		}
			})
		};
		
		vm.select2RepositoryStatus={};
		vm.select2RepositoryType={};
        vm.doReset = () => {
			vm.search.projectName='';
			vm.search.reposName='';
			vm.search.reposType='';
			vm.search.status='';
        	vm.repositoryStatus = undefined;
        	vm.select2RepositoryType.reset();
			vm.select2RepositoryStatus.reset();
        };
        
        vm.showDialog = () => {
            DialogService.modal({
	            key: '创建代码库',
	            url: 'business/components/branchDetails/repositoryManage/createRespository/createRepository.html',
	            accept: (result) => {
	                console.log(result);
	            },
	            refuse: (reason) => {
	                console.log(reason);
	            }
	            }, {
	            key: '创建代码库',
	            data: {msg: 'this is data from modalCtrl!'}
            });
        };
    }
}

export default app => {
    app.controller('repositoryManage', repositoryManage);
};