import {
    Inject
} from 'business/decorator/decorator'

@Inject
class notificationManage {
    constructor($scope, $filter,DialogService, AlertService,HttpService, $stateParams,$state) {
        let vm = $scope;
        
        vm.search = {};
        onLoadPageForNotification();
        function onLoadPageForNotification(){
        	HttpService.get('notifications/admin').then(d=>{
        		if(null == d.notificationDOListRespVO){
        			vm.notificationDOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.notificationDOListRespVO = d.notificationDOListRespVO.theListData;
	        		vm.total = d.notificationDOListRespVO.totalSize;
	        		vm.pageSize = d.notificationDOListRespVO.pageSize;
	        		vm.page = d.notificationDOListRespVO.currentPage;
        		}
        	});
        	
        	/*HttpService.get('notifications/type').then(d=>{
        		vm.notificationTypeList = d.type;
        	});*/
        	/*
        	HttpService.get('notifications/emergency').then(d=>{
        		vm.emergencyList = d.emergency;
        	});*/
        	
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
			HttpService.get('notifications/admin',params).then(d => {
				if(null == d.notificationDOListRespVO){
        			vm.notificationDOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.notificationDOListRespVO = d.notificationDOListRespVO.theListData;
	        		vm.total = d.notificationDOListRespVO.totalSize;
	        		vm.pageSize = d.notificationDOListRespVO.pageSize;
	        		vm.page = d.notificationDOListRespVO.currentPage;
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
		
		vm.datePicker = {};
		initDate();
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
			HttpService.get('notifications/admin',params).then(d=>{
				if(null == d.notificationDOListRespVO){
        			vm.notificationDOListRespVO = null;
        			vm.total = 0;
        			vm.pageSize = 0;
            		vm.page = 0;
        		}else{
	        		vm.notificationDOListRespVO = d.notificationDOListRespVO.theListData;
	        		vm.total = d.notificationDOListRespVO.totalSize;
	        		vm.pageSize = d.notificationDOListRespVO.pageSize;
	        		vm.page = d.notificationDOListRespVO.currentPage;
        		}
        	})
        };
        
		vm.select2NotificationType = {};
        vm.select2Emergency = {};
        vm.doResetNotification = () => {
			vm.datePicker.date = {
				"startDate": null,
				"endDate": null,
			};
			vm.notificationType='';
			vm.emergency='';
			vm.search.type = '';
        	vm.search.emergency = '';
        	vm.search.creator = '';
			vm.select2NotificationType.reset();
			vm.select2Emergency.reset();
        };
        
        vm.doClose=(id)=>{
        	
        	AlertService.confirm({
      	      title: '提示框',
      	      content: '通知关闭后不再显示'
      	    }).then(() => {
      	    	console.info('confirm OK');
      	    	HttpService.put('notifications/'+id+'/state',{
      	    		state:0
      	    	}).then(d=>{
      	    		onLoadPageForNotification();
            	})
      	    }, () => {
      	      console.info('confirm CANCEL');
      	    })
        };
        
        vm.doOpen=(id)=>{
        	
        	AlertService.confirm({
      	      title: '提示框',
      	      content: '确定开启吗？'
      	    }).then(() => {
      	    	console.info('confirm OK');
      	    	HttpService.put('notifications/'+id+'/state',{
      	    		state:1
      	    	}).then(d=>{
      	    		//onLoadPageForNotification();
            	})
      	    }, () => {
      	      console.info('confirm CANCEL');
      	    })
        };
        
        vm.doStick=(stick,id)=>{
        	
        	
      	    	HttpService.put('notifications/'+id+'/stick',{
      	    		'stick':stick
      	    	}).then(d=>{
      	    		//onLoadPageForNotification();
            	})
      	   
        };
    }
}

export default app => app.controller('notificationManage', notificationManage);