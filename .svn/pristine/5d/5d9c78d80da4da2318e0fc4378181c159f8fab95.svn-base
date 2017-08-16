let createFlowWithoutSystem = ($scope, DialogService,$stateParams) => {
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

};

export default app =>app.controller('createFlowWithoutSystem', createFlowWithoutSystem)