/**
 * Created by 17030515 on 2017/6/12.
 */
import {
    Inject
} from 'business/decorator/decorator';

@Inject
class OdinTaskCtrl {
    constructor($scope, HttpService, DialogService, $state, AlertService) {
        let vm = $scope;

        Array.prototype.contains = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) {
                    return true;
                }
            }
            return false;
        };

        Array.prototype.remove = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) {
                    this.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        Array.prototype.contains = function (val, prop) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][prop] == val[prop]) {
                    return true;
                }
            }
            return false;
        };

        Array.prototype.get = function (val, prop) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][prop] == val) {
                    return this[i];
                }
            }
            return null;
        };

        Array.prototype.remove = function (val, prop) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][prop] == val[prop]) {
                    this.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        vm.isActive = false;


        vm.envTypeList = [{"id": "devEnvAndBranch", "name": "DEV"}, {"id": "sitEnvAndBranch", "name": "SIT"}, {
            "id": "preEnvAndBranch",
            "name": "PRE"
        }, {"id": "prdEnvAndBranch", "name": "PRD"}];
        vm.selectPackageIdList = [];
        vm.versionList = [];
        vm.buildConfigList = [];
        vm.branchList = [];
        vm.envList = [];
        vm.envVO = {};
        vm.odinTask = {};
        vm.odinStep = 1;
        init();
        function init() {

            HttpService.get('common/getUrl/odin').then(d => {
                //vm.sysList=d.data;
                vm.odinDomainUrl = d;
            });

            HttpService.get('common/queryVersionList/' + vm.data.flow.sysId).then(d => {
                //vm.sysList=d.data;
                vm.versionList = d;
            });

            HttpService.get('common/queryBuildConfigList/' + vm.data.flow.sysId).then(d => {
                //vm.sysList=d.data;
                vm.buildConfigList = d;
            });

            /*HttpService.get('common/getEnv/' + vm.data.flow.sysId).then(d => {
                //vm.sysList=d.data;
                vm.envVO = d;
            });*/

            HttpService.get('user/getFullName').then(d => {
                //vm.sysList=d.data;
                vm.currentUserFullName = d;
            });


        }

        vm.versionChange = ()=> {
            vm.selectPackageIdList = [];
            if (!vm.odinTask.versionId) {
                vm.branchList = [];
                return;
            }

            HttpService.get('common/getEnvAndBranch/'+vm.data.flow.sysId+"/" + vm.odinTask.versionId).then(d => {
                //vm.sysList=d.data;
                vm.envVO = d;
                if(vm.odinTask.envType){
                    vm.envTypeChange();
                }
            });
        }

        vm.packageChange = (branch, packagePO)=> {
            if (packagePO.packageId) {
                packagePO.branchId = branch.branchId;
                if (packagePO.checked) {
                    vm.selectPackageIdList.push(packagePO);
                } else {
                    vm.selectPackageIdList.remove(packagePO);
                }
                refresh(packagePO.packageId, packagePO.checked,branch);
                vm.envTypeChange();
            }
        }

        function refresh(packageId, checked,branch) {
            if (vm.envList && vm.envList.length > 0) {
                angular.forEach(vm.envList, function (item) {
                    if (item.odinTaskEnvPackagePOList && item.odinTaskEnvPackagePOList.length > 0) {
                        var packageItem = item.odinTaskEnvPackagePOList.get(packageId, "packageId");
                        if (packageItem) {
                            packageItem.checked = checked;
                            packageItem.branchId = branch.branchId;
                            packageItem.branchVersion=branch.branchVersion;
                            packageItem.branchUrl=branch.branchUrl;
                            packageItem.reposId = branch.reposId;
                            return false;
                        }
                    }
                })
            }
        }

        /*vm.envTypeChange = ()=> {
            vm.envList = [];
            vm.envList = vm.envVO[vm.odinTask.envType].envList;

            vm.branchList=[];
            vm.branchList=vm.envVO[vm.odinTask.envType].odinTaskBranchDOList;
        }*/

        vm.envTypeChange = function () {
            vm.envList = [];
            vm.envList = angular.copy(vm.envVO[vm.odinTask.envType].envList);
            vm.envList.forEach(env=>{
                env.strategyList=[];
            })
            vm.branchList = [];
            var id = [];
            vm.branchList = vm.envVO[vm.odinTask.envType].odinTaskBranchDOList;
            for(var o = 0; o < vm.branchList.length; o++){
                for(var a = 0;a<vm.branchList[o].packagePOList.length;a++){
                    if(vm.branchList[o].packagePOList[a].checked == true){
                        id.push(vm.branchList[o].packagePOList[a].packageId);
                    }
                }
            }
            for(var i = 0;i<vm.envVO[vm.odinTask.envType].envList.length;i++){
                for(var m = 0;m<vm.envVO[vm.odinTask.envType].envList[i].strategyList.length;m++){
                    for(var p = 0;p<vm.envVO[vm.odinTask.envType].envList[i].strategyList[m].packageList.length;p++){
                        var packageId = vm.envVO[vm.odinTask.envType].envList[i].strategyList[m].packageList[p].packageId;
                        if(id.indexOf(packageId) != -1){
                            vm.envList[i].strategyList.push(vm.envVO[vm.odinTask.envType].envList[i].strategyList[m]);
                            break;
                        }
                    }
                }
            }
        };

        vm.strategyChange = (env)=> {
            env.html='';
            if (env.strategyList && env.strategyId) {
                angular.forEach(env.strategyList, function (item) {
                    if (item.strategyId == env.strategyId) {
                        env.odinTaskEnvPackagePOList = item.packageList;
                        if (env.odinTaskEnvPackagePOList && env.odinTaskEnvPackagePOList.length > 0) {
                            angular.forEach(env.odinTaskEnvPackagePOList, function (envPackage) {
                                var itemPackage = vm.selectPackageIdList.get(envPackage.packageId, "packageId");
                                if (itemPackage) {
                                    envPackage.checked = itemPackage.checked;
                                    envPackage.branchId = itemPackage.branchId;
                                    envPackage.branchVersion=itemPackage.branchVersion;
                                    envPackage.branchUrl=itemPackage.branchUrl;
                                    envPackage.reposId = itemPackage.reposId;
                                }
                            });
                        }
                        env.html=createHtml(env.odinTaskEnvPackagePOList);
                        return false;
                    }
                })
            }
        }

        $scope.nextOdinStep = (step) => {
            if (step == 1) {
                vm.odinStep = step;
                vm.isActive = false;
            } else{
                vm.odinStep = step;
                vm.isActive = true;
                return;
            }

        };

        function createHtml(packageList){
            if(!packageList || packageList.length<1){
                return '';
            }
            
            var html='';
            angular.forEach(packageList,function(item){
                html+="<label class=\"checkbox-inline\"><input type=\"checkbox\" disabled=\"true\" checked=\""+!!item.checked+"\"> "+item.packageName+"</label>";
            }); 
            return html;
        }
        
        function validateBranch() {

            if(!vm.branchList || vm.branchList.length<1){
                AlertService.alert({title: "提示", content: "版本没有分支，暂不支持部署！"});
                return false;
            }

            if(!vm.selectPackageIdList || vm.selectPackageIdList.length<1){
                AlertService.alert({title: "提示", content: "请至少选择一个可部署DU包！"});
                return false;
            }

            var hasNotSelectConfig=false;
            angular.forEach(vm.branchList,function (branch) {
                if(!branch.packagePOList) {
                    return true;
                }
                var newList=branch.packagePOList.filter(function (it) {
                    return it.checked;
                });
                if(!newList||newList.length<1){
                    return true;
                }
                if(!branch.buildConfigId){
                    hasNotSelectConfig=true;
                    return false;
                }
            });

            if(hasNotSelectConfig){
                AlertService.alert({title: "提示", content: "请选择分支的打包配置！"});
                return false;
            }


            return true;
        }

        //提交
        vm.save = () => {

            if(!validateBranch()){
                return;
            }
            var odinTask = {};
            odinTask.taskName = vm.node.taskAlias;
            odinTask.versionId = vm.odinTask.versionId;
            odinTask.envType = vm.odinTask.envType;
            odinTask.odinType = 1;
            odinTask.branchPOList = getBranchList();
            odinTask.odinTaskEnvDOList = getOdinTaskEnvList();
            if(!validateEnv(odinTask)){
                return;
            }
            HttpService.post('flow/task/add', odinTask).then(function (result) {
                vm.data.callback(copy(result));
                vm.close();
            });
            //参数验证
            //vm.data.callback();
        };
        
        function validateEnv(odinTask) {
            if(!odinTask.odinTaskEnvDOList||odinTask.odinTaskEnvDOList.length<1){
                AlertService.alert({title: "提示", content: "请至少选择一个环境实例！"});
                return false;
            }

            var hasNotSelectStrategyId=false;
            var hasNotSelectPackageId=false;
            angular.forEach(odinTask.odinTaskEnvDOList,function (item) {
                if(!item.strategyId){
                    hasNotSelectStrategyId=true;
                    return false;
                }
                if(!item.odinTaskEnvPackagePOList || item.odinTaskEnvPackagePOList.length<1){
                    hasNotSelectPackageId=true;
                    return false;
                }
            });
            if(hasNotSelectStrategyId){
                AlertService.alert({title: "提示", content: "请选择环境实例的发布策略！"});
                return false;
            }
            if(hasNotSelectPackageId){
                AlertService.alert({title: "提示", content: "所选环境实例必须勾选部署包！"});
                return false;
            }

            return true;
        }

        function getBranchList() {
            var branchList=angular.copy(vm.branchList);
            angular.forEach(branchList,function (item) {
                delete item.packagePOList;
            })
            return branchList;
        }

        function getOdinTaskEnvList() {
            var envList=angular.copy(vm.envList);

            envList=envList.filter(function (env) {
                delete env.packagePOList;
                delete env.strategyList;
                return env.checked;
            });

            if (envList && envList.length > 0) {
                angular.forEach(envList,function (env) {
                    var odinTaskEnvPackagePOList=[];
                    if(env.odinTaskEnvPackagePOList&&env.odinTaskEnvPackagePOList.length>0){
                        odinTaskEnvPackagePOList= env.odinTaskEnvPackagePOList.filter(function (item) {
                            delete item.odinTaskEnvDOList;
                            return item.checked;
                        });
                    }
                    env.odinTaskEnvPackagePOList=odinTaskEnvPackagePOList;
                });
            }

            return envList;
            
        }

        function copy(resource) {
            var tar = {};
            tar.taskId = resource.taskId;
            tar.taskName = resource.taskName;
            tar.taskType = 2;
            tar.taskAlias = resource.taskName;
            return tar;
        }
    }
}
export default app => {
    app.controller('OdinTaskCtrl', OdinTaskCtrl);
};