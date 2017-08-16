let epicView = ($scope, DialogService,$stateParams,$sce) => {
  let vm = $scope;
  vm.circle = false;
    vm.count=0;
    vm.reloadFlag=true;
  vm.close = () => {
    // way 1:
    DialogService.dismiss(vm.key);

    // or
    DialogService.refuse(vm.key, 'dialog refuse! cancel!');
  };
  vm.commit = () => {  
    DialogService.accept(vm.key, 'dialog accept!');
    //vm.circle = false;

    console.log(vm.circle);
  };

  /*var name = $stateParams.name
  var systemName = $stateParams.name*/
  
 /* var name = vm.data.proName;
  var systemName = vm.data.proSysName;*/
  var projectBO =  vm.data.projectBO;
  var appId = sessionStorage.getItem("appId")
  var appName = sessionStorage.getItem("appName")
  
  var venusUrl='http://venussit.cnsuning.com';
  
  if (location.hostname.match('sit')) {
	  venusUrl = "http://venussit.cnsuning.com";
  } else if (location.hostname.match("dev")) {
	  venusUrl = "http://venussit.cnsuning.com";
  } else if (location.hostname.match('pre')) {
	  venusUrl = "http://venus.cnsuning.com";
  } else {
	  venusUrl = "http://venus.cnsuning.com";
  }
  //{{venusUrl}}/#/epic/{{projectBO.projectId}}/{{projectBO.sysName}}/{{projectBO.name}}/{{projectBO.systemName}}
  vm.url = $sce.trustAsResourceUrl(venusUrl+'/#/epic/'+projectBO.projectId+'/'+projectBO.sysName+'/'+projectBO.name+'/'+projectBO.systemName);
};

export default app =>app.controller('epicView', epicView)