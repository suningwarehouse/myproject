import {
    Inject
} from 'business/decorator/decorator'

@Inject
class createNotification {
    constructor($scope, $filter,DialogService, HttpService, userService, Loading, $stateParams,$state) {
        let vm = $scope;
        let formData=vm.formData={};
		vm.detail = '';
		 //商品详情富文本控件的配置
        $scope.serviceDetailEditorOptions = {
            //focus: true,
            toolbars: [
                [
                    // 'source', //源代码
                    '|',
                    'undo', //撤销
                    'redo', //重做
                    '|',
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    'fontborder', //字符边框
                    'strikethrough', //删除线
                    'superscript', //上标
                    'subscript', //下标
                    'removeformat', //清除格式
                    'formatmatch', //格式刷
                    'autotypeset', //自动排版
                    '|',
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    'selectall', //全选
                    'cleardoc', //清空文档
                    '|',
                    'rowspacingtop', //段前距
                    'rowspacingbottom', //段后距
                    'lineheight', //行间距
                    '|',
                    'customstyle', //自定义标题
                    'paragraph', //段落格式
                    'fontfamily', //字体
                    'fontsize', //字号
                    '|',
                    'indent', //首行缩进
                    '|',
                    'fullscreen',
                    'justifyleft', //居左对齐
                    'justifycenter', //居中对齐
                    'justifyright', //居右对齐
                    'justifyjustify', //两端对齐
                    '|',
                    'touppercase', //字母大写
                    'tolowercase', //字母小写
                    '|',
                    'link', //超链接
                    'unlink', //取消链接
                    '|',
                    'imagenone', //默认
                    'imageleft', //左浮动
                    'imageright', //右浮动
                    'imagecenter', //居中
                    '|',
                    'insertimage', //多图上传
                    '|',
                    'horizontal', //分隔线
                    '|',
                    'searchreplace', //查询替换
                ]
            ],
            imageScaleEnabled: false,
        }
        $scope.$on('ueditorLoaded', function (ev, data) {
            if (data) {
                UE.dom.domUtils.setStyles(data.ueditor.body, { 'font-family': 'Microsoft YaHei' });
            }
        });
        vm.typeList = [{name:"通知",value:"notice"},{name:"公告",value:"announcement"},{name:"规范",value:"regulation"}];
        
        vm.centerList = [{name:"一级中心",value:"center1"},{name:"二级中心",value:"center2"}];
        
        vm.appLevelList = [{name:"一级",value:1},{name:"二级",value:2},{name:"三级",value:3}];
        
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        
        vm.commit = {};
        vm.commit.creator = sessionStorage.getItem("userName");
        
        onLoadPage();
		function onLoadPage(){
			userService.getSelectUsers().then(function (result) {
                vm.users = result;
                vm.users.forEach(e => {
                    e.text = e.name;
                    e.id = e.code;
                })
            })
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
        
        vm.click_commit=()=>{
        	var fileObj = document.getElementById("file").files;
        	if(fileObj.length < 1){
        		commit_no_file();
        	}else{
        		commit_with_file();
        	}
    	}

        function commit_no_file(){
        	vm.detail;
			vm.commit.body = vm.detail;
        	HttpService.post('notifications/',{
        		documentNumber:vm.commit.documentNumber,
        		creator:vm.commit.creator,
        		center:vm.commit.center,
        		department:vm.commit.department,
        		receiver:vm.commit.receiver,
        		createTime:vm.commit.createTime,
        		emergency:vm.commit.emergency,
        		type:vm.commit.type,
        		title:vm.commit.title,
        		body:vm.commit.body,
        		label:vm.commit.label,
        		stick:vm.commit.stick,
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
            		documentNumber:vm.commit.documentNumber,
            		creator:vm.commit.creator,
            		center:vm.commit.center,
            		department:vm.commit.department,
            		receiver:vm.commit.receiver,
            		createTime:vm.commit.createTime,
            		emergency:vm.commit.emergency,
            		type:vm.commit.type,
            		title:vm.commit.title,
            		body:vm.commit.body,
            		label:vm.commit.label,
            		stick:vm.commit.stick,
            		appPush:vm.commit.appPush,
            		appLevel:vm.commit.appLevel,
            		pushStyle:vm.commit.pushStyle,
            		appName:vm.commit.appName
            }
        	
        	var fileObj = document.getElementById("file").files;
        	var FileController = "phoebus/notifications/save";
           
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
        	xhr.onloadstart = function () {
            	Loading(true,FileController)
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
        
        vm.commit.userNoList =[];
        vm.userNoList;
		vm.getandupdate = num => {
            return userService.getAndUpdateUser(num).then(d => {
                d = d.filter(function (e) {
                    return e.code === num
                })
                d.forEach(e => {
                    e.id = e.code;
                    e.text = e.name
                })
                return d
            })
        };
        
        vm.onChangeSlelectStatus = (user) => {
			 if(user == null){
				 vm.commit.receiver = '';
			 }else{
				 vm.commit.receiver = user.name;
			 }
        };
	}
}

export default app => app.controller('createNotification', createNotification);