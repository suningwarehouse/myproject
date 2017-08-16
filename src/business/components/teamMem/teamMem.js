import {
    Inject
} from 'business/decorator/decorator';
import addMember from './addMember/addMember';
@Inject
class teamMem {
    constructor($scope, DialogService, AlertService,$state, $stateParams, HttpService, $filter) {
        let vm = $scope;
	
        var appId = sessionStorage.getItem("appId")
        var appName = sessionStorage.getItem("appName")
        
		vm.select2Status={};
		vm.thestatus = 1;
		vm.statusList = [{text:'技术总监',value:1},{text:'技术负责人',value:2}];
		vm.menberList = [{text:'技术总监',duty:'应用的主要负责人、可以进行团队成员的管理、对应用下各服务进行管理',personInfo:[{name:'陈军',number:'10111065',mailbox:'10111065@cnsuning.com'},{name:'陈军1',number:'10111065',mailbox:'10111065@cnsuning.com'}]},
		{text:'技术负责人',duty:'应用的主要负责人、可以进行团队成员的管理、对应用下各服务进行管理',personInfo:[{name:'陈军',number:'10111065',mailbox:'10111065@cnsuning.com'},{name:'陈军1',number:'10111065',mailbox:'10111065@cnsuning.com'}]}];
		onLoadPage();
		function onLoadPage(){
        	HttpService.get('team/roles?roleName=').then(d=>{
        		vm.roleDOList = d;
        	});
        	
        	HttpService.get('team/'+appId).then(d=>{
        		vm.listRoleVO = d.teamBO.listRoleVO;
        		vm.allListRoleVO = d.teamBO.listRoleVO;
        	});
        };

        vm.onChangeRoleDOSlelect = (roleDO) => {
			if (typeof (roleDO) == "undefined" || roleDO == null) {
				vm.listRoleVO = vm.allListRoleVO;
			} else {
				vm.listRoleVO = [];
				vm.allListRoleVO.forEach((e, i) => {
					if (e.roleId === roleDO.roleId) {
						vm.listRoleVO.push(e);
					}
				});
			}
		};
		$(
			function(){
				$('body').on('click','.down_',function(){
					//console.log($(this).parent().height());
					var Keight = $(this).parent().height()+15;
					var pp = $(this).parent().parent();
					if(pp.height() > 80){
						pp.animate({height:'50px'},250);
						pp.addClass('csshiden');
						$(this).find('.down').addClass('topTop');
					}else{
						pp.animate({height: Keight+'px'},250);
						pp.removeClass('csshiden');
						$(this).find('.down').removeClass('topTop');
					}
					
				});
			}
		);
		vm.test = () => {
			var param = {
				systemId:appId,
				userNo:'10111065'
			};
			HttpService.get('team/test',param).then(d=>{
				onLoadPage();
        	});
		};

     	vm.addMember = (d,task) => {
        	DialogService.modal({
                key: 'addMember',
                url: 'business/components/teamMem/addMember/addMember.html',
                accept: (result) => {
                    console.log(result);
                    init();
                },
                refuse: (reason) => {
                    console.log(reason);
                }
            }, {
                key: 'addMember',
                data: {
                    msg: 'this is data from modalCtrl!'
                }
            });
     	};
     	
     	vm.doDelete=(roleId,userNo)=>{
 
     		var param = {
 				systemId: appId,
        		roleId: roleId,
        		userNo: userNo
     		};
     		 
     		AlertService.confirm({
     			title: '删除资源',
     			content: '确定删除吗？'
     		}).then(() => {
     			console.info('confirm OK');
     			HttpService.delete('team/'+appId+'/'+roleId+'/'+userNo).then(d=>{
     				onLoadPage()
     			})
     		}, () => {
     			console.info('confirm CANCEL');
		    })
		 }
    }
}

export default app => {
    app.controller('teamMem', teamMem);
	INCLUDE_ALL_MODULES([addMember], app)
};