import {
    Inject
} from 'business/decorator/decorator';

@Inject
class message {
    constructor($scope, DialogService, $state, $stateParams, HttpService, $filter,serve) {
        let vm = $scope;
        $scope.datePicker = {};
		
		vm.form = {};
		if(serve.getValue() == 1){
			vm.boxID = 1;
			vm.isFirst = true;
			vm.isSecond = false;
			
		}else{
			vm.boxID = 2;
			vm.isFirst = false;
			vm.isSecond = true;
			
		}
		
		vm.changeBox = (d) => {
			vm.boxID = d;
			if (d === 1) {
				vm.isFirst = true;
				vm.isSecond = false;
			}
			if (d === 2) {
				vm.isFirst = false;
				vm.isSecond = true;
			}
		};
        vm.crumbBaseData = [
                            { href: "/", title: "首页" },
                            { href: "", title: "消息中心" }
                            ];
        /***********************事件日志***************************/
        onLoadPageForEvent();
		initDate();
        
        function onLoadPageForEvent(){
        	HttpService.get('events/').then(d=>{
        		if(null == d.eventDOListRespVO){
        			vm.eventDOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.eventDOListRespVO = d.eventDOListRespVO.theListData;
	        		vm.total = d.eventDOListRespVO.totalSize;
	        		vm.pageSize = d.eventDOListRespVO.pageSize;
	        		vm.page = d.eventDOListRespVO.currentPage;
        		}
        	});
        	
        	HttpService.get('events/operateType').then(d=>{
        		vm.operateTypeList = d.operateTypeList;
        	});
        	
        	HttpService.get('events/appName').then(d=>{
        		vm.appNameList = d.appNameList;
        	});
        	
        	vm.operateType = '';
        	vm.appName = '';
        	vm.form.operator = '';
        	
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
						var startdate = new Date(ev.model.startDate);
						var enddate = new Date(ev.model.endDate);
						//获取操作记录
						var start=$filter('date')(startdate, 'yyyy-MM-dd HH:mm:ss');
						var end=$filter('date')(enddate, 'yyyy-MM-dd HH:mm:ss');
						getOptions(start,end);
					}
				}
        	};
		};
    
        
        function getOptions(start, end) {
            vm.startTime = start;
            vm.endTime = end;
        }
        
        vm.onChangeSlelectAppName = (appName) => {
        	vm.appName = appName;
		};
		
        vm.onChangeSlelectOperateType = (operateType) => {
			vm.operateType = operateType;
		};
        
        vm.doSearch = () => {
        	var params = {
    			operateType:vm.operateType,
    			appName:vm.appName,
        		operator:vm.form.operator,
        		startTime:vm.startTime,
        		endTime:vm.endTime
        	};
			HttpService.get('events/',params).then(d => {
				if (null == d.eventDOListRespVO) {
					vm.eventDOListRespVO = null;
					vm.total = 0;
					vm.pageSize = 0;
					vm.page = 0;
				} else {
					vm.eventDOListRespVO = d.eventDOListRespVO.theListData;
					vm.total = d.eventDOListRespVO.totalSize;
					vm.pageSize = d.eventDOListRespVO.pageSize;
					vm.page = d.eventDOListRespVO.currentPage;
				}
			});
		};
		
		vm.paging1 = (pageArg, pageSizeArg, totalArg) => {
			var params = {
	    			operateType:vm.operateType,
	    			appName:vm.appName,
	        		operator:vm.form.operator,
	        		startTime:vm.startTime,
	        		endTime:vm.endTime,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
			HttpService.get('events/',params).then(d=>{
				if (null == d.eventDOListRespVO) {
					vm.eventDOListRespVO = null;
					vm.total = 0;
					vm.pageSize = 0;
					vm.page = 0;
				} else {
					vm.eventDOListRespVO = d.eventDOListRespVO.theListData;
					vm.total = d.eventDOListRespVO.totalSize;
					vm.pageSize = d.eventDOListRespVO.pageSize;
					vm.page = d.eventDOListRespVO.currentPage;
				}
        	})
        };
        
        vm.select2OperateType = {};
        vm.select2AppName = {};
        vm.doReset = () => {
			$scope.datePicker.date = {
				"startDate": null,
				"endDate": null,
			};
			vm.form.operator = '';
			vm.appName = '';
			vm.operateType = '';
			vm.select2OperateType.reset();
			vm.select2AppName.reset();
        };
        /***********************事件日志***************************/
        
        /***********************系统通知***************************/
        vm.search = {};
        onLoadPageForNotification();
        function onLoadPageForNotification(){
        	HttpService.get('notifications/').then(d=>{
        		if(null == d.notificationDOListRespVO){
        			vm.notificationDOListRespVO = null;
        			vm.total2 = 0;
        			vm.pageSize2 = 0;
            		vm.page2 = 0;
        		}else{
	        		vm.notificationDOListRespVO = d.notificationDOListRespVO.theListData;
	        		vm.total2 = d.notificationDOListRespVO.totalSize;
	        		vm.pageSize2 = d.notificationDOListRespVO.pageSize;
	        		vm.page2 = d.notificationDOListRespVO.currentPage;
        		}
        	});
        	/*
        	HttpService.get('notifications/type').then(d=>{
        		vm.notificationTypeList = d.type;
        	});
        	
        	HttpService.get('notifications/emergency').then(d=>{
        		vm.emergencyList = d.emergency;
        	});
        	*/
        	vm.search.type = '';
        	vm.search.emergency = '';
        	vm.search.creator = '';
        };
        
        vm.doSearchNotification = () => {
        	var params = {
    			type:vm.search.type,
    			emergency:vm.search.emergency,
    			creator:vm.search.creator,
        		startTime:vm.startTime,
        		endTime:vm.endTime
        	};
			HttpService.get('notifications/',params).then(d => {
				if(null == d.notificationDOListRespVO){
        			vm.notificationDOListRespVO = null;
        			vm.total2 = 0;
        			vm.pageSize2 = 0;
            		vm.page2 = 0;
        		}else{
	        		vm.notificationDOListRespVO = d.notificationDOListRespVO.theListData;
	        		vm.total2 = d.notificationDOListRespVO.totalSize;
	        		vm.pageSize2 = d.notificationDOListRespVO.pageSize;
	        		vm.page2 = d.notificationDOListRespVO.currentPage;
        		}
			});
		};
		
		vm.notificationTypeList = [{name:"通知",value:"notice"},{name:"公告",value:"announcement"},{name:"规范",value:"regulation"}];
		vm.onChangeNotificationTypeSlelect = (notificationType) => {
			if(notificationType === undefined || notificationType === null){
				vm.search.type = '';
			}else{
				vm.search.type = notificationType.value;
			}
		};
		
		vm.emergencyList = [{name:"一般",value:1},{name:"紧急",value:2},{name:"非常紧急",value:3}];
        vm.onChangeEmergencySlelect = (emergency) => {
        	if(emergency === undefined || emergency === null){
        		vm.search.emergency ='';
        	}else{
	        	vm.search.emergency = emergency.value;
        	}
		};
		
		vm.paging2 = (pageArg, pageSizeArg, totalArg) => {
			var params = {
					type:vm.search.type,
	    			emergency:vm.search.emergency,
	    			creator:vm.search.creator,
	        		startTime:vm.startTime,
	        		endTime:vm.endTime,
	        		pageNumber:pageArg,
	        		pageSize:pageSizeArg
	        	};
			HttpService.get('notifications/',params).then(d=>{
				if(null == d.notificationDOListRespVO){
        			vm.notificationDOListRespVO = null;
        			vm.total2 = 0;
        			vm.pageSize2 = 0;
            		vm.page2 = 0;
        		}else{
	        		vm.notificationDOListRespVO = d.notificationDOListRespVO.theListData;
	        		vm.total2 = d.notificationDOListRespVO.totalSize;
	        		vm.pageSiz2e = d.notificationDOListRespVO.pageSize;
	        		vm.page2 = d.notificationDOListRespVO.currentPage;
        		}
        	})
        };
		
		vm.select2NotificationType = {};
        vm.select2Emergency = {};
        vm.doResetNotification = () => {
			$scope.search.datePicker.date = {
				"startDate": null,
				"endDate": null,
			};
			vm.search.type = '';
        	vm.search.emergency = '';
        	vm.search.creator = '';
			vm.select2NotificationType.reset();
			vm.select2Emergency.reset();
        };
        /***********************系统通知***************************/
    }
}

export default app => {
    app.controller('message', message);
};