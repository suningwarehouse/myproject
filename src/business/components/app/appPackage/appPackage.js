import {
    Inject
} from 'business/decorator/decorator'

import editAppPackageCtrl from './editAppPackage/editAppPackage';
@Inject
class appPackageCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService,DialogService,AlertService) {
        let vm = $scope;
		vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
		
		
		 vm.crumbBaseData = [
	                            { href: "/", title: "首页" },
	                            { href: "/#/overview/appManage/", title: "应用管理" },
	                            { href: "", title: "部署单元" }
	                        ];
		 
		
        init();
        function init() {
        	var params = { 
        			appId: vm.appId,
        			page:0,
        			pageSize:1000
        	};
        	getPackageByApp(params);
        }

        // 查询包
        function getPackageByApp(params){
        	HttpService.post('appPackage/search/'+vm.appId+'?page='+params.page+'&pageSize='+params.pageSize,params).then(result => {
                vm.packageList = result;
        	});
        }
        
        
        
        vm.editAppPackage = (d,appId,packageId) => {
        	if(d=='edit'){
        		var params={
        				packageId:packageId
        		}
        		HttpService.get('appPackage/'+vm.appId+'/isPackageUse',params).then(function(result){
            		vm.isPackageUse=result.isPackageUse;
            		
            		showEditAppPackage(d,appId,packageId);
            	});
        	}else{
        		showEditAppPackage(d,appId,packageId);
        	}
        };

        function showEditAppPackage (d,appId,packageId){
        	DialogService.modal({
                key: 'editAppPackage',
                url: 'business/components/app/appPackage/editAppPackage/editAppPackage.html',
                accept: (result) => {
                    console.log(result);
                    init();
                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'editAppPackage',
                data: {
                    msg: 'this is data from modalCtrl!',
                    action:d,
                    packageId:packageId,
                    isPackageUse:vm.isPackageUse
                }
            });
        }
       
        
        function  deleteAppPackage(appId,packageId,index){
        	var params={
    				packageId:packageId,
    				appId:appId
    		}
        	 HttpService.delete('appPackage/'+vm.appId+'/delete',params).then(function (data){
 				AlertService.alert({
                     title: "删除成功",
                     content: '删除应用发布包成功!'
                 }).then(function() {
                 		vm.packageList.splice(index,1);
                 });
        	 });
        }
        //删除包
        vm.delAppPackage = (appId,packageId,index) => {
        	var params = {
        		packageId:packageId,
        		appId:appId
        	};
        	HttpService.get('appPackage/'+vm.appId+'/isPackageUse',params).then(function(result){
        		if(result.isPackageUse){
        			alert("不能删除部署单元,原因:"+result.message);
        			return false;
        		}else{
        			deleteAppPackage(appId,packageId,index);
        		}
        	});
        }

      }
}


export default app => {
    app.controller('appPackageCtrl', appPackageCtrl)
     INCLUDE_ALL_MODULES([editAppPackageCtrl], app)
};


