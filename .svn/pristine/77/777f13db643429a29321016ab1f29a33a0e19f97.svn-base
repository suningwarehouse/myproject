import {
    Inject
} from 'business/decorator/decorator';

@Inject
class proManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter) {
        let vm = $scope;
        vm.status= $stateParams.status;
        vm.statusName = ['删除','进行中','暂停','终止','关闭']
        vm.eitpUrl='http://odinsit3.cnsuning.com';
        
        if (location.hostname.match('sit')) {
        	vm.eitpUrl = "http://eitpsit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
        	vm.eitpUrl = "http://eitpsit.cnsuning.com";
        } else if (location.hostname.match('pre')) {
        	vm.eitpUrl = "http://eitp.cnsuning.com";
        } else {
        	vm.eitpUrl = "http://eitp.cnsuning.com";
        }
        
        vm.transData=()=>{
            console.log('vm.transData');
            vm.projectBOListRespVO[0].rw=1;
            if(null == vm.projectBOListRespVO || vm.projectBOListRespVO.length < 2) return;
            var tmpI=0;
            var tmpId=vm.projectBOListRespVO[0].projectId;
            
            var i=1;
            for(;i<vm.projectBOListRespVO.length;i++){
            if(vm.projectBOListRespVO[i].projectId != tmpId){
            vm.projectBOListRespVO[tmpI].rw= i - tmpI;
            tmpI=i;
            tmpId=vm.projectBOListRespVO[i].projectId;
            }
            }
            vm.projectBOListRespVO[tmpI].rw=i - tmpI;
           }
        onLoadPage();
        function onLoadPage(){
			
        	HttpService.get('projects/',{status:vm.status}).then(d=>{
        		if(null == d.projectBOListRespVO){
        			vm.projectBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.projectBOListRespVO = d.projectBOListRespVO.theListData;
	        		vm.total = d.projectBOListRespVO.totalSize;
	        		vm.pageSize = d.projectBOListRespVO.pageSize;
	        		vm.page = d.projectBOListRespVO.currentPage;
	        		vm.transData();
	        		console.log(vm.projectBOListRespVO);
        		}
        	});
        	
        	HttpService.get('projects/appName').then(d=>{
        		vm.appNameList = d.appNameList;
        	});
        	
        	vm.venusUrl='http://venussit.cnsuning.com';
            
            if (location.hostname.match('sit')) {
            	vm.venusUrl = "http://venussit.cnsuning.com";
            } else if (location.hostname.match("dev")) {
            	vm.venusUrl = "http://10.24.40.170:8080";
            } else if (location.hostname.match('pre')) {
            	vm.venusUrl = "http://venussit.cnsuning.com";
            } else {
            	vm.venusUrl = "http://venus.cnsuning.com";
            }
            
            // http://10.37.55.28:8080/issues/?jql=fixVersion=10010%20AND%20issuetype=缺陷
            
            vm.jiraUrl='http://10.37.55.28:8080';
            
            if (location.hostname.match('sit')) {
            	vm.jiraUrl = "http://10.37.55.28:8080";
            } else if (location.hostname.match("dev")) {
            	vm.jiraUrl = "http://10.37.55.28:8080";
            } else if (location.hostname.match('pre')) {
            	vm.jiraUrl = "http://10.37.55.28:8080";
            } else {
            	vm.jiraUrl = "http://10.37.55.28:8080";
            }
        };
        
        vm.search = {};
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	var params = {
        			projectKey:vm.search.projectKey,
        			systemKey:vm.search.systemKey,
        			status:vm.search.status,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
        	HttpService.get('projects/',params).then(d=>{
        		if(null == d.projectBOListRespVO){
        			vm.projectBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.projectBOListRespVO = d.projectBOListRespVO.theListData;
	        		vm.total = d.projectBOListRespVO.totalSize;
	        		vm.pageSize = d.projectBOListRespVO.pageSize;
	        		vm.page = d.projectBOListRespVO.currentPage;
	        		vm.transData();
        		}
        	});
        };
        
        vm.doSearch = () => {
        	var params = {
        			projectKey:vm.search.projectKey,
        			systemKey:vm.search.systemKey,
        			status:vm.search.status,
	        	};
        	
        	HttpService.get('projects/',params).then(d=>{
        		if(null == d.projectBOListRespVO){
        			vm.projectBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.projectBOListRespVO = d.projectBOListRespVO.theListData;
	        		vm.total = d.projectBOListRespVO.totalSize;
	        		vm.pageSize = d.projectBOListRespVO.pageSize;
	        		vm.page = d.projectBOListRespVO.currentPage;
	        		vm.transData();
        		}
        	});
		};
		
		vm.statusList = [
	                       {id:1,value:"进行中"},
	                       {id:2,value:"已暂停"},
	                       {id:3,value:"已终止"},
	                       {id:4,value:"已关闭"},
	                       /*{id:0,value:"已删除"},*/
	                   ];
		
		vm.statusList.find(function (x) {
            if(x.id+'' === vm.status){
            	vm.thestatus = x;
            }
        })
		
		vm.search={};
        vm.onChangeSlelectStatus = (thestatus) => {
        	if(thestatus == null){
        		vm.search.status = '';
        	}else{
        		vm.search.status = thestatus.id;
        	}
		};
		
		vm.select2Status={};
        vm.doReset = () => {
        	vm.search.projectKey='';
			vm.search.systemKey=''; 
			vm.search.status='';
			vm.thestatus = undefined;
			vm.select2Status.reset();
        };
        
        $scope.showDialog = (projectBO) => {
            DialogService.modal({
            key: 'dialogDemo',
            url: 'business/components/branchDetails/proManage/epicView/epicView.html',
            accept: (result) => {
                console.log(result);
            },
            refuse: (reason) => {
                console.log(reason);
            }
            }, {
            key: 'dialogDemo',
            data: {projectBO:projectBO}
            });
        };
    }
}

export default app => {
    app.controller('proManage', proManage);
};