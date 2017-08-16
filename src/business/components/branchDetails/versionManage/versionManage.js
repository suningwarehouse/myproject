import {
    Inject
} from 'business/decorator/decorator';

@Inject
class versionManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter) {
        let vm = $scope;
		vm.statusName = ['开发中','已封版','已发布','已归档','已废弃'];
        vm.status = $stateParams.status;
        vm.statusList = [
                       {id:1,value:"开发中"},
                       {id:2,value:"已封版"},
                       {id:3,value:"已发布"},
                       {id:4,value:"已归档"},
                       {id:0,value:"已废弃"},
                   ];
        
        vm.statusList.find(function (x) {
            if(x.id+'' === vm.status){
            	vm.thestatus = x;
            }
        })
		
        
        onLoadPage();
        
        function onLoadPage(){
        	HttpService.get('versions/',{status:vm.status}).then(d=>{
        		if(null == d.versionBOListRespVO){
        			vm.versionBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.versionBOListRespVO = d.versionBOListRespVO.theListData;
	        		vm.total = d.versionBOListRespVO.totalSize;
	        		vm.pageSize = d.versionBOListRespVO.pageSize;
	        		vm.page = d.versionBOListRespVO.currentPage;
        		}
        	});
        	
        	HttpService.get('versions/appName').then(d=>{
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
            
            vm.select2status = {};
            
            HttpService.get('notifications/id').then(d=>{
        		vm.notificationIdList = d.ids;
        	});
        };
        
        vm.showDialog = () => {
            DialogService.modal({
	            key: '创建版本',
	            url: 'business/components/branchDetails/versionManage/createVersion/createVersion.html',
	            accept: (result) => {
	                console.log(result);
	            },
	            refuse: (reason) => {
	                console.log(reason);
	            }
	            }, {
	            key: '创建版本',
	            data: {msg: 'this is data from modalCtrl!'}
            });
        };
        vm.search={};
        vm.onChangeSlelectStatus = (thestatus) => {
        	if(thestatus == null){
        		vm.search.status = '';
        	}else{
        		vm.search.status = thestatus.id;
        	}
		};
        
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	
        	var params = {
        			sysId:vm.search.sysId,
        			version:vm.search.version,
        			status:vm.search.status,
        			sysName:vm.search.sysName,
        			versionName:vm.search.versionName,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
			HttpService.get('versions/',params).then(d=>{
				if(null == d.versionBOListRespVO){
        			vm.versionBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.versionBOListRespVO = d.versionBOListRespVO.theListData;
	        		vm.total = d.versionBOListRespVO.totalSize;
	        		vm.pageSize = d.versionBOListRespVO.pageSize;
	        		vm.page = d.versionBOListRespVO.currentPage;
        		}
        	})
        };
        
/*
 * vm.doReset = () => { vm.status1 = ""; }
 */
        vm.doSearch = () => {
        	var params = {
        			sysId:vm.search.sysId,
        			version:vm.search.version,
        			status:vm.search.status,
        			sysName:vm.search.sysName,
        			versionName:vm.search.versionName
	        };
			HttpService.get('versions/',params).then(d => {
				if(null == d.versionBOListRespVO){
        			vm.versionBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.versionBOListRespVO = d.versionBOListRespVO.theListData;
	        		vm.total = d.versionBOListRespVO.totalSize;
	        		vm.pageSize = d.versionBOListRespVO.pageSize;
	        		vm.page = d.versionBOListRespVO.currentPage;
        		}
			});
		};
		
		vm.select2Status={};
		vm.doReset = () => {
			vm.search.version='';
			vm.search.status='';
			vm.search.sysName='';
			vm.search.versionName='',
			vm.thestatus = undefined;
			vm.select2Status.reset();
		};
    }
}

export default app => {
    app.controller('versionManage', versionManage);
};