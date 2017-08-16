import {
    Inject
} from 'business/decorator/decorator'

@Inject
class leftColumn {
    constructor($scope, LoginService, $rootScope, UserService, HttpService, $state, $document) {
        let vm = $scope;
        vm.closed = false
        vm.appNameFilter = {
            appName: ''
        }
        vm.toggleNav = () => {
            vm.closed = !vm.closed
            let bar = document.querySelector('div.phoebus-level2-left cd-navbar'),
                height = parseInt(window.getComputedStyle(bar).height);
            if (vm.closed) {
                document.querySelector('div.phoebus-level2-left cd-navbar').style.height = height + 40 + 'px'
            } else {
                setTimeout(function () {
                    document.querySelector('div.phoebus-level2-left cd-navbar').style.height = height - 40 + 'px'
                }, 400)
            }
        }
        vm.appId = sessionStorage.getItem("appId");
        vm.appName = sessionStorage.getItem("appName");

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            vm.isOptionsShow = false;
            vm.appNameFilter.appName = ''
        })

        window.addEventListener('blur', function () {
            if (document.activeElement === document.querySelector('iframe')) {
                vm.isOptionsShow = false;
                vm.appNameFilter.appName = ''
                vm.$apply()
            }
        });

        window.addEventListener('click', e => {
            vm.isOptionsShow = false;
            vm.appNameFilter.appName = ''
            vm.$apply()
        }, false)

        vm.onChangeSlelectApp = (app) => {
            vm.isOptionsShow = false;
            sessionStorage.setItem("appId", app.appId);
            sessionStorage.setItem("appName", app.appName);
            vm.appId = app.appId;
            vm.appName = app.appName;
            loadMenu();
            $state.reload($state.current.name)
            vm.appNameFilter.appName = ''
        };
        init();

        function init() {
            HttpService.get('overview/query/getAppByUser?page=0&pageSize=1000').then(function (result) {
                vm.apps = result;
            });
            loadMenu();
        }

        function loadMenu() {
            //左侧菜单栏
            $scope.menus = [{
                name: '系统版本历程',
                state: 'topHead.leftColumn.appProcess',
                icon: 'fa icon-overview'
            }, {
                name: '版本管理',
                state: 'topHead.leftColumn.appDetail',
                param: {
                    name: 'version',
                    id: vm.appId,
                    num: 0
                },
                //                href: phoebussitUrl+ '/#/appDetail/version/'+vm.appId+'/',
                icon: 'fa icon-system'
            }, {
                name: '代码托管',
                icon: 'fa icon-edition',
                children: [{
                        name: "代码库管理",
                        icon: "fa icon-edition",
                        //href: saturnUrl+'/#/'
                        //href: phoebussitUrl+ '/#/repositoryManageBySystem/'
                        state: 'topHead.leftColumn.repositoryManageBySystem'
                    }
                    /*, {
                                        name: "代码健康度",
                                        icon: "fa icon-system",
                                        //href:  saturnUrl + '/#/reposHealth'
                                        state: 'topHead.leftColumn.repositoryManageByHealth'
                                    }*/
                ]
            }, {
                name: '持续集成',
                icon: 'fa icon-document',
                children: [{
                    code: "4-4",
                    name: "构建任务管理",
                    icon: "fa icon-release",
                    state: 'topHead.leftColumn.integrationManageByStstem'
                    //href:  phoebussitUrl + '/#/integrationManageByStstem/'+vm.appName
                }, {
                    code: "4-5",
                    name: "构建配置管理",
                    icon: "fa icon-system",
                    state: 'topHead.leftColumn.integrationManageForConfig'
                    //href:  phoebussitUrl + '/#/integrationManageByStstem/'+vm.appName
                }, {
                    code: "4-6",
                    name: "Docker镜像管理",
                    icon: "fa icon-system",
                    state: 'topHead.leftColumn.integrationManageForDocker'
                    //href:  phoebussitUrl + '/#/integrationManageByStstem/'+vm.appName
                }]

            }, {
                name: '过程改进中心',
                icon: 'fa icon-contrast',
                children: [{
                    name: "质量检查",
                    icon: "fa icon-assurance",
                    //http://neptunesit.cnsuning.com/#/checkHisReport/1953
                    //href: neptunesitUrl+'/#/checkHisReport/'+vm.appId
                    state: 'topHead.leftColumn.checkHisReport',
                    //    }, {
                    //         name: "关联质量标准",
                    //         icon: "fa icon-system",
                    //         href:  odinUrl + '/#/system/'+vm.appName+'/'+vm.appId+'/envDetail'
                }]

            }, {
                name: '部署单元',
                state: 'topHead.leftColumn.appPackage',
                icon: 'fa icon-assurance'
            }, {
                name: '构件仓库',
                icon: 'fa icon-jurisdiction',
                children: [{
                        name: "构件查询",
                        state: 'topHead.leftColumn.componentManageSearch',
                        icon: 'fa fa-laptop'
                    }, {
                        name: "使用统计",
                        state: 'topHead.leftColumn.componentManageCount',
                        icon: 'fa fa-laptop'
                    }
                    // , {
                    //     name: "仓库设置",
                    //     state: 'topHead.leftColumn.componentManageSite',
                    //     icon: 'fa fa-laptop'
                    // }
                ]
            }, {
                name: '蛙测',
                state: 'topHead.leftColumn.testTask',
                icon: 'fa icon-edition'
            }, {
                name: '安全扫描',
                state: 'topHead.leftColumn.securityScanTask',
                icon: 'fa icon-assurance'
            }, {
                name: '流水线',
                state: 'topHead.leftColumn.navheadDetail.flowList',
                param: {
                    sysId: vm.appId
                },
                icon: 'fa fa-laptop'
            }, {
                name: '自动化部署',
                icon: 'fa fa-umbrella',
                children: [{
                        name: "发布单",
                        icon: "fa icon-system",
                        //href: odinUrl+'/#/releasesheet/'+vm.appId
                        //href:phoebussitUrl + '/#/deploymentListBySystem/'+vm.appId
                        state: 'topHead.leftColumn.deploymentListBySystem'
                    }, {
                        name: "环境实例",
                        icon: "fa icon-system",
                        //href: odinUrl + '/#/system/'+vm.appName+'/'+vm.appId+'/envDetail'
                        //href:phoebussitUrl + '/#/deploymentEnvInstance/'+vm.appName+'/'+vm.appId
                        state: 'topHead.leftColumn.deploymentEnvInstance'
                    }, {
                        name: "自定义发布流程",
                        icon: "fa icon-system",
                        //href: odinUrl + '/#/actionSetListSys/'+vm.appId
                        //href:phoebussitUrl + '/#/defineDeploymentFlow/'+vm.appId
                        state: 'topHead.leftColumn.defineDeploymentFlow'
                    }
                    /*, {
                                                 name: "自定义发布策略",
                                                 icon: "fa icon-system",
                                                 //href:  odinUrl + '/#/overview'
                                                 //href:phoebussitUrl + '/#/defineDeploymentStrategy/'+vm.appId
                                                 state: 'topHead.leftColumn.defineDeploymentStrategy'
                                            }*/
                ]

            }, {
                name: '基本信息',
                state: 'topHead.leftColumn.appInfo',
                icon: 'fa fa-umbrella'
            }, {
                name: '团队成员',
                state: 'topHead.leftColumn.teamMem',
                icon: 'fa icon-jurisdiction'
            }, {
                name: '消息中心',
                state: 'topHead.leftColumn.message',
                icon: 'fa fa-laptop'
            }];
        }
        var odinUrl = 'http://odinsit.cnsuning.com';
        var saturnUrl = 'http://saturnsit.cnsuning.com';
        var phoebussitUrl = 'http://phoebussit.cnsuning.com';
        var neptunesitUrl = 'http://neptunesit.cnsuning.com';

        if (location.hostname.match('sit')) {
            odinUrl = "http://odinsit.cnsuning.com";
        } else if (location.hostname.match("dev")) {
            odinUrl = "http://odinsit.cnsuning.com";
        } else if (location.hostname.match('pre')) {
            odinUrl = "http://odinsit.cnsuning.com";
        } else {
            odinUrl = "http://odin.cnsuning.com";
        }


    }
}
export default app => {
    app.controller('leftColumn', leftColumn);

};