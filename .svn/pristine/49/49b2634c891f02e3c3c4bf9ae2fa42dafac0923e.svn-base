import {
    Inject
} from 'business/decorator/decorator'

@Inject
class notificationDetail {
    constructor($scope, $filter,DialogService, HttpService, $stateParams,$state) {
        let vm = $scope;
        var id = $stateParams.id;
        onLoadPage();
		function onLoadPage(){
        	HttpService.get('notifications/'+id).then(d=>{
        		vm.notificationDO = d;
        	});
        	
        	HttpService.get('notifications/id').then(d=>{
        		vm.notificationIdList = d.ids;
        	});
        };
    }
}

export default app => app.controller('notificationDetail', notificationDetail);