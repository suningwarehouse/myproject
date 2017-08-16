import {
    Inject
} from 'business/decorator/decorator'

@Inject
class updateNotification {
    constructor($scope, $filter,DialogService, HttpService, Loading, $stateParams,$state) {
        let vm = $scope;
        var id = $stateParams.id;
        
        vm.typeList = [{name:"通知",value:"notice"},{name:"公告",value:"announcement"},{name:"规范",value:"regulation"}];
        
        vm.centerList = [{name:"一级中心",value:"center1"},{name:"二级中心",value:"center2"}];
        
        vm.appLevelList = [{name:"一级",value:1},{name:"二级",value:2},{name:"三级",value:3}];
        
        onLoadPage();
		function onLoadPage(){
        	HttpService.get('notifications/'+id).then(d=>{
        		var notificationDO = d;
        		vm.commit = {};
        		vm.commit.documentNumber = notificationDO.documentNumber;
        		vm.commit.creator = notificationDO.creator;
        		vm.commit.center = notificationDO.center;
        		vm.commit.department= notificationDO.department;
        		vm.commit.receiver = notificationDO.receiver;
        		vm.commit.createTime = notificationDO.createTime;
        		vm.commit.emergency = notificationDO.emergency;
        		vm.commit.type = notificationDO.type;
        		vm.commit.title = notificationDO.title;
        		vm.commit.body = notificationDO.body;
        		vm.commit.attachmentLink = notificationDO.attachmentLink;
        		vm.commit.label = notificationDO.label;
        		vm.commit.stick = notificationDO.stick;
        		vm.commit.state = notificationDO.state;
        		vm.commit.appPush = notificationDO.appPush;
        		vm.commit.appLevel = notificationDO.appLevel;
        		vm.commit.pushStyle = notificationDO.pushStyle;
        		vm.commit.appName = notificationDO.appName;
        		vm.commit.fileName = '';
        		if(notificationDO.attachmentLink != null){
        			var words = notificationDO.attachmentLink.split('/');
        			if(words.length > 0){
        				vm.commit.fileName = words[words.length-1];
        			}
        		}
        		
        		vm.centerList.forEach((e, i) => {
					if (e.value === vm.commit.center) {
						vm.theCenter = e;
					}
				});
        		
        		vm.typeList.forEach((e, i) => {
					if (e.value === vm.commit.type) {
						vm.thesType = e;
					}
				});
        		
        		vm.appLevelList.forEach((e, i) => {
					if (e.value === vm.commit.appLevel) {
						vm.theAppLevel = e;
					}
				});
        	});
        };
        
        vm.onChangeSlelectType = (thesType) => {
			if (typeof (thesType) == "undefined" || thesType == null) {
				vm.commit.type = null;
			} else {
				vm.commit.type = thesType.value;
			}
		};
		
		vm.onChangeSlelectCenter = (theCenter) => {
			if (typeof (theCenter) == "undefined" || theCenter == null) {
				vm.commit.center = null;
			} else {
				vm.commit.center = theCenter.value;
			}
		};
		
		vm.onChangeSlelectAppLevel = (theAppLevel) => {
			if (typeof (theAppLevel) == "undefined" || theAppLevel == null) {
				vm.commit.appLevel = null;
			} else {
				vm.commit.appLevel = theAppLevel.value;
			}
		};
        
        //关闭
        vm.close = (notificationDO) => {
        	HttpService.put('notifications/'+id,{
        		state:!notificationDO.state
        	}).then(d=>{
        		vm.notificationDO = d;
        	});
        };
        
        vm.click_commit=()=>{
        	var fileObj = document.getElementById("file").files;
        	if(fileObj.length < 1){
        		commit_no_file();
        	}else{
        		commit_with_file();
        	}
    	};
    	
    	function commit_no_file(){
        	
			HttpService.put('notifications/'+id,{
        		id:id,
        		documentNumber:vm.commit.documentNumber,
        		creator:vm.commit.creator,
        		center:vm.commit.center,
        		department:vm.commit.department,
        		receiver:vm.commit.receiver,
        		createTime:vm.commit.createTime,
        		emergency:vm.commit.emergency,
        		attachmentLink:vm.commit.attachmentLink,
        		type:vm.commit.type,
        		title:vm.commit.title,
        		body:vm.commit.body,
        		label:vm.commit.label,
        		stick:vm.commit.stick,
        		state:vm.commit.state,
        		appPush:vm.commit.appPush,
        		appLevel:vm.commit.appLevel,
        		pushStyle:vm.commit.pushStyle,
        		appName:vm.commit.appName
        	}).then(d=>{
        		$state.go('topHead.notificationManage');
        	})
        };
        
        function commit_with_file(){
        	
        	var notification = {
        			id:id,
            		documentNumber:vm.commit.documentNumber,
            		creator:vm.commit.creator,
            		center:vm.commit.center,
            		department:vm.commit.department,
            		receiver:vm.commit.receiver,
            		//createTime:vm.commit.createTime,
            		emergency:vm.commit.emergency,
            		attachmentLink:vm.commit.attachmentLink,
            		type:vm.commit.type,
            		title:vm.commit.title,
            		body:vm.commit.body,
            		label:vm.commit.label,
            		stick:vm.commit.stick,
            		state:vm.commit.state,
            		appPush:vm.commit.appPush,
            		appLevel:vm.commit.appLevel,
            		pushStyle:vm.commit.pushStyle,
            		appName:vm.commit.appName
            }
        	
        	var fileObj = document.getElementById("file").files;
        	var FileController = "phoebus/notifications/"+id+"/save";
           
        	var form = new FormData();
        	for(var i = 0; i< fileObj.length; i++){
        		form.append("files" , fileObj[i] );
        	}
        	
        	var notificationString=JSON.stringify(notification);
            form.append("notificationString", notificationString);
            
        	var xhr = new XMLHttpRequest();
        	xhr.open("post", FileController);
        	xhr.responseType = "json";
        	xhr.send(form);
        	Loading(true,FileController)
        	xhr.onload = function (e) {
        		Loading(false);
	        	var res = xhr.response;
	           	if(res.resultCode == 0 ){
	           		//alert("上传成功！")
	           	}else{
	           		alert("上传失败:"+res.message)
	           	}
	           	$state.go('topHead.notificationManage');
        	};
        }
        
        vm.printFileInfo = () => {
        	vm.disableFlag=false;
	       	vm.fileInfoList=[];
	       	var fileObj = document.getElementById("file").files;
	       	for(var i=0; i< fileObj.length; i++){
	       		var fileInfo={
	       				"number": i+1,
	       				"name": fileObj[i].name,
	       				"size": fileObj[i].size
	       		}
	       		vm.fileInfoList.push(fileInfo);
	       		vm.$apply();
	       	}
        };
    }
}

export default app => app.controller('updateNotification', updateNotification);