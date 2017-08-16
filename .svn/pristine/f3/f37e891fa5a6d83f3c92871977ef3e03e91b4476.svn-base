import {
    Inject
} from 'business/decorator/decorator'

@Inject
class appProcessCtrl {
    constructor($scope,$stateParams, $state,$timeout, $q, $rootScope,$interval,$sce,HttpService) {
        let vm = $scope;
		vm.appId = sessionStorage.getItem("appId");
		vm.appName=sessionStorage.getItem("appName");
        
        vm.versionListtotal = [];

       // vm.versionList = [{createTime:"2017-1-11",name:"版本1",status:"良好"},{createTime:"2017-1-11",name:"版本2",status:"良好"},{createTime:"2017-1-11",name:"版本3",status:"良好"},{createTime:"2017-1-11",name:"版本4",status:"良好"},{createTime:"2017-1-11",name:"版本5",status:"良好"},{createTime:"2017-1-11",name:"版本6",status:"良好"},{createTime:"2017-1-11",name:"版本7",status:"良好"},{createTime:"2017-1-11",name:"版本8",status:"良好"},{createTime:"2017-1-11",name:"版本9",status:"良好"}]
    
      
        
        init();
        function init(){
        	HttpService.get('app/process/'+vm.appId).then(result => {
                vm.versionList = result.versionList;
                vm.venusUrl=result.venusUrl;
                if(vm.versionList){
                	for(var i=0,len=vm.versionList.length;i<len;i+=6){
	        	        vm.versionListtotal.push(vm.versionList.slice(i,i+6));
	        	        }
	        	    vm.versionListshow = vm.versionListtotal[vm.versionListtotal.length-1];
                     
                    vm.versionListshow[vm.versionListshow.length-1].topInfo = true;           
                    addMonth(vm.versionListshow);
		            vm.versionReport=$sce.trustAsResourceUrl(vm.venusUrl+"/#/versionReport/"+vm.versionList[vm.versionList.length-1].id);
                }else{
                	vm.versionReport="";
                     vm.nodate = true;
                }
        	});
    	}
        vm.goleft = () => {
            vm.versionListshow
        	   for(var i=0,len=vm.versionListtotal.length;i<len;i++){
                    if(vm.versionListtotal[i] == vm.versionListshow){
                        if(i == 0){
                            break;
                        }
                        vm.versionListshow = vm.versionListtotal[i-1];
                        pophide(vm.versionListshow);
                        vm.versionListshow[vm.versionListshow.length-1].topInfo = true;
                         addMonth(vm.versionListshow);
                            break;
                    }
                }
        }
        function addMonth(list){  
                for(let i = 0;i<list.length;i++){
                        var array = returnMD(list[i].createTime);
                        list[i].month = array[0];
                        list[i].day = array[1];
                    }
        }
        function returnMD(time){
             var datee = new Date(time);
            var month = ["JAN","FEB","MAR","APR","MAY", "JUN","JUL","AUG","SEP","OCT","NOV","DEC"];       
            return [month[datee.getMonth()],datee.getDate()];
        }
        vm.goright = () => {
            vm.versionListshow
        	   for(var i=0,len=vm.versionListtotal.length;i<len;i++){
                    if(vm.versionListtotal[i] == vm.versionListshow){
                        if(i == len-1){
                            break;
                        }
                        vm.versionListshow = vm.versionListtotal[i+1];
                        pophide(vm.versionListshow);
                        if(vm.versionListshow.length<3){
                            vm.versionListshow[0].topInfo = true;
                        }else{
                            vm.versionListshow[vm.versionListshow.length-1].topInfo = true;
                        }
                         addMonth(vm.versionListshow);
                            break;
                    }
                }
        }
        //点击小球
        vm.ckickBoll = data =>{
            for(let i=0;i<vm.versionListshow.length;i++){
                vm.versionListshow[i].topInfo = false;
                if(vm.versionListshow[i].id == data){
                    vm.versionListshow[i].topInfo = true;
                }
            }
        }
        // 小球弹框隐藏
        function pophide(list){
            for(let i=0;i<list.length;i++){
                list[i].topInfo = false;
            }
        }
        vm.crumbBaseData = [
            { href: "/", title: "首页" },
            { href: "/#/overview/appManage/", title: "应用管理" },
            { href: "", title: "系统版本历程" }
        ];

    		
        vm.changeReport = (id) => {
        	vm.versionReport=$sce.trustAsResourceUrl(vm.venusUrl+"/#/versionReport/"+id);
        }
    

      //  vm.timeLine = [{"id":5,"createTime":"2017-05-27 10:28:33","year":"2017","month":"05","day":"27","versionId":1,"versionName":"v1.1.0","status":"using","statusDesc":"当前使用版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":4,"createTime":"2017-05-27 10:25:56","year":"2017","month":"05","day":"27","versionId":15,"versionName":"的点点滴滴","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":3,"createTime":"2017-05-27 10:24:01","year":"2017","month":"05","day":"27","versionId":3,"versionName":"版本中文test","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":2,"createTime":"2017-05-27 10:23:03","year":"2017","month":"05","day":"27","versionId":14,"versionName":"测试测试","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"},{"id":1,"createTime":"2017-05-27 10:22:48","year":"2017","month":"05","day":"27","versionId":15,"versionName":"的点点滴滴","status":"history","statusDesc":"历史版本","envId":1,"envName":"xz_test1","envCnname":"测试成海芹","pkgId":1,"pkgName":"Test-web.war"}]

    }
}

export default app => app.controller('appProcessCtrl', appProcessCtrl)


