let createRepository = ($scope, DialogService,$stateParams) => {
	let vm = $scope;

	vm.saturnUrl='http://saturnsit.cnsuning.com';
	  
	if (location.hostname.match('sit')) {
		vm.saturnUrl = "http://saturnsit.cnsuning.com";
	} else if (location.hostname.match("dev")) {
		vm.saturnUrl = "http://10.24.40.170:8080";
	} else if (location.hostname.match('pre')) {
		vm.saturnUrl = "http://saturn.cnsuning.com";
	} else {
		vm.saturnUrl = "http://saturn.cnsuning.com";
	}
	vm.url = vm.saturnUrl+"/#/editRepos/new?isPortalHomepage=1";
	  
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

export default app =>app.controller('createRepository', createRepository)