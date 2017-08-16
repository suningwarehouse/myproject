let createVersion = ($scope, DialogService,$stateParams) => {
  let vm = $scope;
  
  if (location.hostname.match('sit')) {
	  venusUrl = "http://venussit.cnsuning.com";
  } else if (location.hostname.match("dev")) {
	  venusUrl = "http://venussit.cnsuning.com";
  } else if (location.hostname.match('pre')) {
	  venusUrl = "http://venus.cnsuning.com";
  } else {
	  venusUrl = "http://venus.cnsuning.com";
  }
  
  vm.url = venusUrl+'/#/versionManage/nosys/'
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

};

export default app =>app.controller('createVersion', createVersion)