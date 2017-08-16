import {
    Inject
} from 'business/decorator/decorator'

@Inject
class appReportCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,HttpService) {
        let vm = $scope;
		vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
    
        
        init();
        function init(){
        	
        	HttpService.get('app/appReport/'+vm.appId).then(result => {
        		vm.app=result.app;
        		
        		vm.users= result.users;
                vm.users.forEach(function(item){
                	 if(item.roleName=="应用负责人(owner)"){
                		vm.appAdmin=item.listUserMemberDO;
                	 }
                })
        	});
        	
        	
        	HttpService.get('app/appReport/version/'+vm.appId).then(result => {
        		vm.version=strToJson(result.version);
        	});
        	
        	
        	HttpService.get('app/appReport/currentQuestion/'+vm.appId).then(result => {
        		vm.currentQuestion=result.currentQuestion;
        	});
        	
        	
        	HttpService.get('app/appReport/closedQuestion/'+vm.appId).then(result => {
        		vm.closedQuestion=result.closedQuestion;
        	});
        	
        	
        	HttpService.get('app/appReport/deploy/'+vm.appId).then(result => {
        		vm.deploy=strToJson(result.deploy);
        	});
        	
        	HttpService.get('app/appReport/quality/'+vm.appId).then(result => {
        		vm.quality=strToJson(result.quality);
        		 vm.versionNames=[];
                 vm.scores=[];
                 angular.forEach(vm.quality, function (item) {
        	         vm.versionNames.push(item.versionName);
        	         vm.scores.push(item.score);
                 })
                 versionQuality();
        	});
    	}

        vm.crumbBaseData = [
            { href: "/", title: "首页" },
            { href: "/#/overview/appManage/", title: "应用管理" },
            { href: "/#/appProcess", title: "系统版本历程" },
            { href: "", title: "应用报告" }
        ];

        
        function strToJson(str){ 
        	var json = (new Function("return " + str))(); 
        	return json; 
        }

        function versionQuality(){
    	vm.option = {
                    title: {
                        text: '部署峰谷值'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['SIT-数据', 'PRE-数据', 'PRD-数据']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: vm.versionNames
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            //boundaryGap: [0.1,0.1],
                            max:100,
                            min:0,
                            splitNumber: 5
                        }
                    ],
                    series: [
                        {
                            name: '应用版本评分',
                            type: 'line',
                            stack: '总量',
                            //areaStyle: {normal: {}},
                            //data: vm.prdDatas
                            data: vm.scores
                        }
                    ]
            };	
        }
        
      //  vm.timeLine = [{"id":5,"createTime":"2017-05-27 10:28:33","year":"2017","month":"05","day":"27","versionId":1,"versionName":"v1.1.0","status":"using","statusDesc":"当前使用版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":4,"createTime":"2017-05-27 10:25:56","year":"2017","month":"05","day":"27","versionId":15,"versionName":"的点点滴滴","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":3,"createTime":"2017-05-27 10:24:01","year":"2017","month":"05","day":"27","versionId":3,"versionName":"版本中文test","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":2,"createTime":"2017-05-27 10:23:03","year":"2017","month":"05","day":"27","versionId":14,"versionName":"测试测试","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":1,"createTime":"2017-05-27 10:22:48","year":"2017","month":"05","day":"27","versionId":15,"versionName":"的点点滴滴","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"}]

    }
}

export default app => app.controller('appReportCtrl', appReportCtrl)


