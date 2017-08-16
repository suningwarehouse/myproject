import {
    Inject
} from 'business/decorator/decorator'

@Inject
class taskDataCtrl {
    constructor($scope, $filter,DialogService, HttpService, $stateParams,userService,$q,$timeout) {
        let vm = $scope;

 
      vm.checkType=  $scope.data.checkType;
    
			
    		
    		

        	
     
 
	  

   
    
   
        //关闭
        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);

            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };
		vm.webshell = [{name:"web后门检测"}];
     
		vm.injection = [{name:"注入延迟检测"},{name:"NoSql注入"},{name:"NoSql注入差异判断"},{name:"Xpath注入"},{name:"基于时间OS命令注入"},{name:"Ldap注入"},{name:"SQL盲定时注射数据库"},{name:"SQL差异注入"},{name:"响应分裂"},{name:"代码注入" ,checked:true},{name:"OS命令注入" ,checked:true},{name:"SQL注入",checked:true}];
		
		vm.xss =[{name:"DOM跨站脚本"},{name:"上下文基于DOM跨站脚本"},{name:"在HTML元素XSS事件属性"},{name:"路径检查中的跨站脚本"},{name:"脚本上下文的跨站脚本"},{name:"HTML标签的跨站脚本"},{name:"XML外部实体攻击"},{name:"响应分裂"},{name:"跨站脚本",checked:true},{name:"跨站点请求伪造检测",checked:true}];
		
		
		vm.directoryFile = [{name:"公开可写目录"},{name:"备份文件检测"},{name:"通用目录检测"},{name:"通用文件检测"},{name:"备份目录检测"},{name:"文件包含检测",checked:true},{name:"远程文件包含",checked:true},{name:"路径遍历",checked:true}];
		
		
		vm.accessPolicy = [{name:"DOM型未经验证的重定向"},{name:"表单上传检测 "},{name:"HTTP严格传输安全"},{name:"页面中HTTP、HTTPS混合资源"},{name:"Cookies设置HttpOnly"},{name:"未加密密码表单"},{name:"未经验证的重定向",checked:true},{name:"会话固定攻击",checked:true}];
		

       if( vm.checkType==1){
    	   vm.webshell.forEach(function(item){
    		   item.checked=true;
    	   })
    	   
    	   vm.injection.forEach(function(item){
    		   item.checked=true;
    	   })
    	   
    	   vm.xss.forEach(function(item){
    		   item.checked=true;
    	   })
    	   
    	   vm.directoryFile.forEach(function(item){
    		   item.checked=true;
    	   })
    	   
    	   vm.accessPolicy.forEach(function(item){
    		   item.checked=true;
    	   })
       }


   
    }
}

export default app => app.controller('taskDataCtrl', taskDataCtrl);