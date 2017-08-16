import {
    cssLoad,
    mockFn
} from '@suning/dubhe-component-css';

export default app => {
    document.domain = 'cnsuning.com';
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        mockFn($stateProvider, 'state')
        // $urlRouterProvider.otherwise('/portal');

        let topHead = 'topHead.';
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go(topHead + 'overview.homePage');
        });

        $stateProvider
            // .state('Header', {
            //     abstract: true,
            //     cssUrl: 'business/components/headerCD/headerCD.css',
            //     templateUrl: 'business/components/headerCD/headerCD.html',
            //     controller: 'headerCD'
            // })
            .state('topHead', {
                abstract: true,
                cssUrl: 'business/components/topHead/topHead.css',
                templateUrl: 'business/components/topHead/topHead.html',
                controller: 'topHead',
                resolve: {
                    User: ['User', 'LoginService', (User, LoginService) => {
                        return User.then(d => {
                            if (!d.data.hasLogin) {
                                LoginService.jumpLogin(d.data)
                            }
                        }, d => {
                            console.log(d)
                        }).catch(e => {
                            console.log(e)
                        })
                    }]
                }
            })
            .state('topHead.overview', {
                abstract: true,
                url: '/overview',
                templateUrl: 'business/components/overview/overview.html',
                cssUrl: 'business/components/overview/overview.css',
                controller: 'overview'
            })

            .state('topHead.overview.proManage', {
                url: '/proManage/?status',
                cssUrl: 'business/components/branchDetails/proManage/proManage.css',
                templateUrl: 'business/components/branchDetails/proManage/proManage.html',
                controller: 'proManage'
            })
            .state('topHead.overview.homePage', {
                url: '/homePage',
                cssUrl: 'business/components/homePage/homePageHigh.css',
                templateUrl: 'business/components/homePage/homePageHigh.html',
                controller: 'homePage'
            })
            .state('topHead.overview.appManage', {
                url: '/appManage/?status',
                templateUrl: 'business/components/branchDetails/appManage/appManage.html',
                cssUrl: 'business/components/branchDetails/appManage/appManage.css',
                controller: 'appManageCtrl'
            })
            /*******************************************************************/
            .state('topHead.overview.versionManage', {
                url: '/versionManage/?status',
                templateUrl: 'business/components/branchDetails/versionManage/versionManage.html',
                cssUrl: 'business/components/branchDetails/versionManage/versionManage.css',
                controller: 'versionManage'
            })
            .state('topHead.overview.componentManage', {
                url: '/componentManage',
                templateUrl: 'business/components/branchDetails/componentManage/componentManage.html',
                cssUrl: 'business/components/branchDetails/componentManage/componentManage.css',
                controller: 'componentManage'
            })
            .state('topHead.overview.flowManage', {
                url: '/flowManage',
                templateUrl: 'business/components/branchDetails/flowManage/flowManage.html',
                cssUrl: 'business/components/branchDetails/flowManage/flowManage.css',
                controller: 'flowManage'
            })
            .state('topHead.leftColumn.componentManageSearch', {
                url: '/componentManageSearch',
                templateUrl: 'business/components/branchDetails/componentManage/componentManageSearch/componentManageSearch.html',
                cssUrl: 'business/components/branchDetails/componentManage/componentManageSearch/componentManageSearch.css',
                controller: 'componentManageSearch'
            })
            .state('topHead.leftColumn.componentManageCount', {
                url: '/componentManageCount',
                templateUrl: 'business/components/branchDetails/componentManage/componentManageCount/componentManageCount.html',
                cssUrl: 'business/components/branchDetails/componentManage/componentManageCount/componentManageCount.css',
                controller: 'componentManageCount'
            })
            .state('topHead.leftColumn.componentManageSite', {
                url: '/componentManageSite',
                templateUrl: 'business/components/branchDetails/componentManage/componentManageSite/componentManageSite.html',
                cssUrl: 'business/components/branchDetails/componentManage/componentManageSite/componentManageSite.css',
                controller: 'componentManageSite'
            })
            .state('topHead.overview.deploymentManage', {
                url: '/deploymentManage',
                templateUrl: 'business/components/branchDetails/deploymentManage/deploymentManage.html',
                cssUrl: 'business/components/branchDetails/deploymentManage/deploymentManage.css',
                controller: 'deploymentManage'
            })
            .state('topHead.overview.repositoryManage', {
                url: '/repositoryManage',
                templateUrl: 'business/components/branchDetails/repositoryManage/repositoryManage.html',
                cssUrl: 'business/components/branchDetails/repositoryManage/repositoryManage.css',
                controller: 'repositoryManage'
            })
            .state('topHead.overview.integrationManage', {
                url: '/integrationManage',
                templateUrl: 'business/components/branchDetails/integrationManage/integrationManage.html',
                cssUrl: 'business/components/branchDetails/integrationManage/integrationManage.css',
                controller: 'integrationManage'
            })
            .state('topHead.overview.improvementManage', {
                url: '/improvementManage',
                templateUrl: 'business/components/branchDetails/improvementManage/improvementManage.html',
                cssUrl: 'business/components/branchDetails/improvementManage/improvementManage.css',
                controller: 'improvementManage'
            })
            .state('topHead.leftColumn.checkHisReport', {
                url: '/checkHisReport',
                templateUrl: 'business/components/branchDetails/improvementManage/checkHisReport/checkHisReport.html',
                cssUrl: 'business/components/branchDetails/improvementManage/checkHisReport/checkHisReport.css',
                controller: 'checkHisReport'
            })
            /*******************************************************************/
            //新首页路由
            .state('topHead.leftColumn', {
                abstract: true,
                templateUrl: 'business/components/leftColumn/leftColumn.html',
                cssUrl: 'business/components/leftColumn/leftColumn.css',
                controller: 'leftColumn'
            })
            .state('topHead.leftColumn.navheadDetail', {
                // url: '/navheadDetail',
                templateUrl: 'business/components/navheadDetail/navheadDetail.html',
                cssUrl: 'business/components/navheadDetail/navheadDetail.css',
                controller: 'navheadDetail'
            })

            .state('topHead.leftColumn.appProcess', {
                url: '/appProcess',
                templateUrl: 'business/components/app/process/appProcesshigh.html',
                cssUrl: 'business/components/app/process/appProcesshigh.css',
                controller: 'appProcessCtrl'
            })
            /*******************************************************************/
            .state('topHead.projectManage', {
                abstract: '/projectManage',
                cssUrl: 'business/components/branchMenu/projectManage/projectManage.css',
                templateUrl: 'business/components/branchMenu/projectManage/projectManage.html',
                controller: 'projectManage'
            })

            .state('topHead.appManage', {
                abstract: true,
                cssUrl: 'business/components/branchMenu/appManage/appManage.css',
                templateUrl: 'business/components/branchMenu/appManage/appManage.html',
                controller: 'appManage'
            })
            //             .state('topHead.appManage.appProcess', {
            //                 url: '/appProcess',
            //                 templateUrl: 'business/components/app/process/appProcess.html',
            //                 cssUrl: 'business/components/app/process/appProcess.css',
            //                 controller: 'appProcessCtrl'
            //             })

            .state('topHead.leftColumn.appReport', {
                url: '/appReport',
                templateUrl: 'business/components/app/process/appReport.html',
                cssUrl: 'business/components/app/process/appReport.css',
                controller: 'appReportCtrl'
            })

            .state('topHead.leftColumn.appDetail', {
                url: '/appDetail/:name/:id/:num',
                templateUrl: 'business/components/app/appDetail/appDetail.html',
                cssUrl: 'business/components/app/appDetail/appDetail.css',
                controller: 'appDetailCtrl'
            })

            .state('topHead.leftColumn.appInfo', {
                url: '/appInfo',
                templateUrl: 'business/components/app/appInfo/appInfo.html',
                cssUrl: 'business/components/app/appInfo/appInfo.css',
                controller: 'appInfoCtrl'
            })



            .state('topHead.leftColumn.testTask', {
                url: '/testTask',
                templateUrl: 'business/components/test/scts/testTask.html',
                cssUrl: 'business/components/test/scts/testTask.css',
                controller: 'testTaskCtrl',
                data: {
                    title: '蛙测',
                    description: '蛙测'
                }
            })

            .state('topHead.leftColumn.securityScanTask', {
                url: '/securityScanTask',
                templateUrl: 'business/components/test/tracker/securityScanTask.html',
                cssUrl: 'business/components/test/tracker/securityScanTask.css',
                controller: 'securityScanTaskCtrl'
            })

            .state('topHead.leftColumn.editTask', {
                url: '/editTask/:type/?taskId',
                templateUrl: 'business/components/test/tracker/editTask/editTask.html',
                cssUrl: 'business/components/test/tracker/editTask/editTask.css',
                controller: 'editTaskCtrl'
            })

            .state('topHead.leftColumn.editTestTask', {
                url: '/editTestTask/:type/?taskId',
                templateUrl: 'business/components/test/scts/editTask/editTask.html',
                cssUrl: 'business/components/test/scts/editTask/editTask.css',
                controller: 'editTestTaskCtrl'
            })
            .state('topHead.leftColumn.taskRecord', {
                url: '/taskRecord/:type/:taskId/:taskName',
                templateUrl: 'business/components/test/taskRecord/taskRecord.html',
                cssUrl: 'business/components/test/taskRecord/taskRecord.css',
                controller: 'taskRecordCtrl'
            })

            .state('topHead.leftColumn.appPackage', {
                url: '/appPackage',
                templateUrl: 'business/components/app/appPackage/appPackagehigh.html',
                cssUrl: 'business/components/app/appPackage/appPackagehigh.css',
                controller: 'appPackageCtrl'
            })




            // .state('Header.AssemblyLineDetail', {
            //     url: '/assemblyLineDetail',
            //     templateUrl: 'business/components/assemblyLineDetail/assemblyLineDetail.html',
            //     cssUrl: 'business/components/assemblyLineDetail/assemblyLineDetail.css',
            //     controller: 'assemblyLineDetailCtrl'
            // })
            // .state('Header.CreateAssemblyLine', {
            //     url: '/createAssemblyLine',
            //     templateUrl: 'business/components/createAssemblyLine/createAssemblyLine.html',
            //     cssUrl: 'business/components/createAssemblyLine/createAssemblyLine.css',
            //     controller: 'createAssemblyLineCtrl'
            // })
            .state('topHead.leftColumn.dictItem', {
                url: '/dictItem',
                templateUrl: 'business/components/dictItem/dictItem.html',
                cssUrl: 'business/components/dictItem/dictItem.css',
                controller: 'DictItemCtrl'
            })
            .state('topHead.leftColumn.navheadDetail.flowList', {
                url: '/flowList/:sysId',
                templateUrl: 'business/components/flow/flowList.html',
                cssUrl: 'business/components/flow/flowList.css',
                controller: 'FlowListCtrl',
                data: {
                    title: '流水线',
                    description: '可按需定制多阶段多任务的流水线，包含持续集成、蛙测、安全扫描、部署；可定时自动执行，实时监控；可随时查看流水线执行情况。'
                }
            })

            .state('topHead.leftColumn.createFlow', {
                url: '/createFlow/:sysId',
                templateUrl: 'business/components/flow/create/createFlow.html',
                cssUrl: 'business/components/flow/create/createFlow.css',
                controller: 'FlowCreateCtrl'
            })

            .state('topHead.leftColumn.teamMem', {
                url: '/teamMem',
                templateUrl: 'business/components/teamMem/teamMem.html',
                cssUrl: 'business/components/teamMem/teamMem.css',
                controller: 'teamMem'
            })
            .state('topHead.leftColumn.editFlow', {
                url: '/editFlow/:flowId/:sysId',
                templateUrl: 'business/components/flow/edit/editFlow.html',
                cssUrl: 'business/components/flow/edit/editFlow.css',
                controller: 'FlowEditCtrl'
            })

            .state('topHead.leftColumn.detailFlow', {
                url: '/detailFlow/:flowId/:sysId',
                templateUrl: 'business/components/flow/detail/detailFlow.html',
                cssUrl: 'business/components/flow/detail/detailFlow.css',
                controller: 'FlowDetailCtrl'
            })
            .state('topHead.leftColumn.flowHistoryDetailView', {
                url: '/flowHistoryDetailView/:id',
                templateUrl: 'business/components/flow/detail/flowHistoryDetailView.html',
                cssUrl: 'business/components/flow/detail/flowHistoryDetailView.css',
                controller: 'FlowHistoryDetailViewCtrl'
            })
            .state('topHead.leftColumn.integrationManageForConfig', {
                url: '/integrationManageForConfig',
                templateUrl: 'business/components/branchDetails/integrationManage/integrationManageForConfig/integrationManageForConfig.html',
                cssUrl: 'business/components/branchDetails/integrationManage/integrationManageForConfig/integrationManageForConfig.css',
                controller: 'integrationManageForConfig'
            })
            .state('topHead.leftColumn.integrationManageByStstem', {
                url: '/integrationManageByStstem',
                templateUrl: 'business/components/branchDetails/integrationManage/integrationManageByStstem/integrationManageByStstem.html',
                cssUrl: 'business/components/branchDetails/integrationManage/integrationManageByStstem/integrationManageByStstem.css',
                controller: 'integrationManageByStstem'
            })
            .state('topHead.leftColumn.integrationManageForDocker', {
                url: '/integrationManageForDocker',
                templateUrl: 'business/components/branchDetails/integrationManage/integrationManageForDocker/integrationManageForDocker.html',
                cssUrl: 'business/components/branchDetails/integrationManage/integrationManageForDocker/integrationManageForDocker.css',
                controller: 'integrationManageForDocker'
            })

            .state('topHead.leftColumn.deploymentListBySystem', {
                url: '/deploymentListBySystem',
                templateUrl: 'business/components/branchDetails/deploymentManage/deploymentListBySystem/deploymentListBySystem.html',
                cssUrl: 'business/components/branchDetails/deploymentManage/deploymentListBySystem/deploymentListBySystem.css',
                controller: 'deploymentListBySystem'
            })

            .state('topHead.leftColumn.deploymentEnvInstance', {
                url: '/deploymentEnvInstance',
                templateUrl: 'business/components/branchDetails/deploymentManage/deploymentEnvInstance/deploymentEnvInstance.html',
                cssUrl: 'business/components/branchDetails/deploymentManage/deploymentEnvInstance/deploymentEnvInstance.css',
                controller: 'deploymentEnvInstance'
            })

            .state('topHead.leftColumn.defineDeploymentStrategy', {
                url: '/defineDeploymentStrategy',
                templateUrl: 'business/components/branchDetails/deploymentManage/defineDeploymentStrategy/defineDeploymentStrategy.html',
                cssUrl: 'business/components/branchDetails/deploymentManage/defineDeploymentStrategy/defineDeploymentStrategy.css',
                controller: 'defineDeploymentStrategy'
            })

            .state('topHead.leftColumn.defineDeploymentFlow', {
                url: '/defineDeploymentFlow',
                templateUrl: 'business/components/branchDetails/deploymentManage/defineDeploymentFlow/defineDeploymentFlow.html',
                cssUrl: 'business/components/branchDetails/deploymentManage/defineDeploymentFlow/defineDeploymentFlow.css',
                controller: 'defineDeploymentFlow'
            })

            .state('topHead.leftColumn.repositoryManageById', {
                url: '/repositoryManageById/:type/:id',
                templateUrl: 'business/components/branchDetails/repositoryManage/repositoryManageById/repositoryManageById.html',
                cssUrl: 'business/components/branchDetails/repositoryManage/repositoryManageById/repositoryManageById.css',
                controller: 'repositoryManageById'
            })

            .state('topHead.leftColumn.repositoryManageBySystem', {
                url: '/repositoryManageBySystem',
                templateUrl: 'business/components/branchDetails/repositoryManage/repositoryManageBySystem/repositoryManageBySystem.html',
                cssUrl: 'business/components/branchDetails/repositoryManage/repositoryManageBySystem/repositoryManageBySystem.css',
                controller: 'repositoryManageBySystem'
            })

            .state('topHead.leftColumn.repositoryManageByHealth', {
                url: '/repositoryManageByHealth',
                templateUrl: 'business/components/branchDetails/repositoryManage/repositoryManageByHealth/repositoryManageByHealth.html',
                cssUrl: 'business/components/branchDetails/repositoryManage/repositoryManageByHealth/repositoryManageByHealth.css',
                controller: 'repositoryManageByHealth'
            })
            .state('topHead.leftColumn.additionFlow', {
                url: '/additionFlow/:sysId',
                templateUrl: 'business/components/branchDetails/additionFlow/additionFlow.html',
                cssUrl: 'business/components/branchDetails/additionFlow/additionFlow.css',
                controller: 'additionFlow'
            })
            .state('topHead.overview.versionCreate', {
                url: '/versionCreate',
                templateUrl: 'business/components/branchDetails/versionManage/versionCreate/versionCreate.html',
                cssUrl: 'business/components/branchDetails/versionManage/versionCreate/versionCreate.css',
                controller: 'versionCreate'
            })
            .state('topHead.overview.codeCreate', {
                url: '/codeCreate',
                templateUrl: 'business/components/branchDetails/repositoryManage/codeCreate/codeCreate.html',
                cssUrl: 'business/components/branchDetails/repositoryManage/codeCreate/codeCreate.css',
                controller: 'codeCreate'
            })

            .state('topHead.overview.message', {
                url: '/message',
                templateUrl: 'business/components/message/message.html',
                cssUrl: 'business/components/message/message.css',
                controller: 'message'
            })
            .state('topHead.leftColumn.message', {
                url: '/message',
                templateUrl: 'business/components/message/message.html',
                cssUrl: 'business/components/message/message.css',
                controller: 'message'
            })
            .state('topHead.createNotification', {
                url: '/createNotification',
                templateUrl: 'business/components/message/createNotification/createNotification.html',
                cssUrl: 'business/components/message/createNotification/createNotification.css',
                controller: 'createNotification'
            })
            /*.state('topHead.overview.notificationDetail', {
                url: '/notificationDetail/:id',
                templateUrl: 'business/components/message/notificationDetail/notificationDetailhigh.html',
                cssUrl: 'business/components/message/notificationDetail/notificationDetailhigh.css',
                controller: 'notificationDetail'
            })*/
            .state('topHead.notificationManage', {
                url: '/notificationManage',
                templateUrl: 'business/components/message/notificationManage/notificationManage.html',
                cssUrl: 'business/components/message/notificationManage/notificationManage.css',
                controller: 'notificationManage'
            })
            .state('topHead.updateNotification', {
                url: '/updateNotification/:id',
                templateUrl: 'business/components/message/updateNotification/updateNotification.html',
                cssUrl: 'business/components/message/updateNotification/updateNotification.css',
                controller: 'updateNotification'
            })
    }]);
    cssLoad(app)
}