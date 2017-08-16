import {
    Inject
} from 'business/decorator/decorator';

@Inject
class componentManage {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter,$timeout) {
        let vm = $scope;
		$scope.datePicker = {};
		var now = Date.parse(new Date().toString());
		$scope.datePicker.date = {
			"startDate": null,
			"endDate": null
		};
        onLoadPage();
        initDate();
        function onLoadPage(){
        	HttpService.get('components/').then(d=>{
        		if(null == d.componentBOListRespVO){
        			vm.componentBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.componentBOListRespVO = d.componentBOListRespVO.theListData;
	        		vm.total = d.componentBOListRespVO.totalSize;
	        		vm.pageSize = d.componentBOListRespVO.pageSize;
	        		vm.page = d.componentBOListRespVO.currentPage;
        		}
        	});
        	
        	vm.jupiterUrl='http://jupitersit.cnsuning.com';
            
            if (location.hostname.match('sit')) {
            	vm.jupiterUrl = "http://jupitersit.cnsuning.com";
            } else if (location.hostname.match("dev")) {
            	vm.jupiterUrl = "http://10.24.40.170:8080";
            } else if (location.hostname.match('pre')) {
            	vm.jupiterUrl = "http://jupiter.cnsuning.com";
            } else {
            	vm.jupiterUrl = "http://jupiter.cnsuning.com";
            }
        };
        
        vm.search = {};
        vm.paging = (pageArg, pageSizeArg, totalArg) => {
        	
        	var params = {
        			applicationName:vm.search.applicationName,
        			packageName:vm.search.packageName,
        			versionName:vm.search.versionName,
        			startTime:vm.search.startTime,
        			endTime:vm.search.endTime,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
        	
        	HttpService.get('components/',params).then(d=>{
        		if(null == d.componentBOListRespVO){
        			vm.componentBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.componentBOListRespVO = d.componentBOListRespVO.theListData;
	        		vm.total = d.componentBOListRespVO.totalSize;
	        		vm.pageSize = d.componentBOListRespVO.pageSize;
	        		vm.page = d.componentBOListRespVO.currentPage;
        		}
        	});
        };
        
        vm.doSearch = () => {
        	var params = {
        			applicationName:vm.search.applicationName,
        			packageName:vm.search.packageName,
        			versionName:vm.search.versionName,
        			startTime:vm.search.startTime,
        			endTime:vm.search.endTime,
	        	};
        	
        	HttpService.get('components/',params).then(d=>{
        		if(null == d.componentBOListRespVO){
        			vm.componentBOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.componentBOListRespVO = d.componentBOListRespVO.theListData;
	        		vm.total = d.componentBOListRespVO.totalSize;
	        		vm.pageSize = d.componentBOListRespVO.pageSize;
	        		vm.page = d.componentBOListRespVO.currentPage;
        		}
        	});
		};
		
        vm.doReset = () => {
				$scope.datePicker.date = {
					"startDate": null,
					"endDate": null,
    			};
			vm.search.applicationName='';
			vm.search.packageName='';
			vm.search.versionName='';
        };
        
        function initDate(){
			vm.dateOption4 = {
				timePicker: true,
				singleDatePicker: false,
				locale:{
					format: 'YYYY-MM-DD HH:mm:ss'
				},
				"timePicker": true,
				"timePicker24Hour": true,
				"timePickerSeconds": true,
				dateLimit: {
					days: 90
				},
				eventHandlers: {
					'apply.daterangepicker': function (ev, picker) {
						var startdate = new Date($scope.datePicker.date.startDate);
						var enddate = new Date($scope.datePicker.date.endDate);
						//获取操作记录
						var start=$filter('date')(startdate, 'yyyy-MM-dd HH:mm:ss');
						var end=$filter('date')(enddate, 'yyyy-MM-dd HH:mm:ss');
						getOptions(start,end);
					}
				}
        	};
		};

        function getOptions(start, end) {
            vm.search.startTime = start;
            vm.search.endTime = end;
        }
    }
}

export default app => {
    app.controller('componentManage', componentManage);
};