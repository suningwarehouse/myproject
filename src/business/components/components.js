import overview from './overview/overview';
import headerCD from './headerCD/headerCD';
import topHead from './topHead/topHead';
import proManage from './branchDetails/proManage/proManage';
import projectManage from './branchMenu/projectManage/projectManage';

import versionManage from './branchDetails/versionManage/versionManage';
import versionCreate from './branchDetails/versionManage/versionCreate/versionCreate';
import codeCreate from './branchDetails/repositoryManage/codeCreate/codeCreate';
import componentManage from './branchDetails/componentManage/componentManage';
import componentManageSearch from './branchDetails/componentManage/componentManageSearch/componentManageSearch';
import componentManageCount from './branchDetails/componentManage/componentManageCount/componentManageCount';
import componentManageSite from './branchDetails/componentManage/componentManageSite/componentManageSite';

import deploymentManage from './branchDetails/deploymentManage/deploymentManage';
import repositoryManage from './branchDetails/repositoryManage/repositoryManage';
import integrationManage from './branchDetails/integrationManage/integrationManage';
import improvementManage from './branchDetails/improvementManage/improvementManage';
import checkHisReport from './branchDetails/improvementManage/checkHisReport/checkHisReport';
import flowManage from './branchDetails/flowManage/flowManage';

import appManage from './branchDetails/appManage/appManage';
import appManageMenu from './branchMenu/appManage/appManage';
//import appProcess from './app/process/appProcess';
import appProcess from './app/process/appProcesshigh';
import appReport from './app/process/appReport';
import appDetail from './app/appDetail/appDetail';
import appInfo from './app/appInfo/appInfo';
import appPackage from './app/appPackage/appPackage';
import editAppPackage from './app/appPackage/editAppPackage/editAppPackage';

import testTask from './test/scts/testTask';
import SecurityScanTask from './test/tracker/SecurityScanTask';
import editTask from './test/tracker/editTask/editTask';
import editTestTask from './test/scts/editTask/editTask';

import taskRecord from './test/taskRecord/taskRecord';

import assemblyLineDetail from './assemblyLineDetail/assemblyLineDetail';
import createAssemblyLine from './createAssemblyLine/createAssemblyLine';

import dictItem from './dictItem/dictItem';
import dictItemEdit from './dictItem/editDictItem/editDictItem';

import flowList from './flow/flowList';
import createFlow from './flow/create/createFlow';
import addGroupName from './flow/create/addGroupName/addGroupName';
import taskList from './flow/create/taskList/taskList';
import sctsTask from './flow/create/taskList/sctsTask';
import trackerTask from './flow/create/taskList/trackerTask';
import uranusTask from './flow/create/taskList/uranusTask';
import odinTask from './flow/create/taskList/odinTask';
import flowCron from './flow/detail/flowCron';
import flowNotify from './flow/detail/flowNotify';
import flowNotifyUser from './flow/detail/flowNotifyUser';
import homePage from './homePage/homePageHigh';

import teamMem from './teamMem/teamMem';
import editFlow from './flow/edit/editFlow';
import detailFlow from './flow/detail/detailFlow';
import flowHistoryDetail from './flow/detail/flowHistoryDetail';
import flowHistoryDetailView from './flow/detail/flowHistoryDetailView';
import alertCtrl from './app/alert/alert';

import leftColumn from './leftColumn/leftColumn';

import createVersion from './branchDetails/versionManage/createVersion/createVersion';

import integrationManageForConfig from './branchDetails/integrationManage/integrationManageForConfig/integrationManageForConfig';
import integrationManageByStstem from './branchDetails/integrationManage/integrationManageByStstem/integrationManageByStstem';
import integrationManageForDocker from './branchDetails/integrationManage/integrationManageForDocker/integrationManageForDocker';
import additionFlow from './branchDetails/additionFlow/additionFlow';

import deploymentListBySystem from './branchDetails/deploymentManage/deploymentListBySystem/deploymentListBySystem';
import deploymentEnvInstance from './branchDetails/deploymentManage/deploymentEnvInstance/deploymentEnvInstance';
import defineDeploymentStrategy from './branchDetails/deploymentManage/defineDeploymentStrategy/defineDeploymentStrategy';
import defineDeploymentFlow from './branchDetails/deploymentManage/defineDeploymentFlow/defineDeploymentFlow';

import repositoryManageById from './branchDetails/repositoryManage/repositoryManageById/repositoryManageById';
import repositoryManageBySystem from './branchDetails/repositoryManage/repositoryManageBySystem/repositoryManageBySystem';
import repositoryManageByHealth from './branchDetails/repositoryManage/repositoryManageByHealth/repositoryManageByHealth';
import epicView from './branchDetails/proManage/epicView/epicView';
import createRepository from './branchDetails/repositoryManage/createRespository/createRepository';
import viewTaskDetial from './flow/create/viewTaskDetial/viewTaskDetial';
import message from './message/message';
import createNotification from './message/createNotification/createNotification';
import notificationDetail from './message/notificationDetail/notificationDetail';
import notificationManage from './message/notificationManage/notificationManage';
import updateNotification from './message/updateNotification/updateNotification';
import navheadDetail from './navheadDetail/navheadDetail';


export default app => {
    INCLUDE_ALL_MODULES([overview,
                         headerCD,
                         topHead,
                         proManage,
                         projectManage,
                         appManageMenu,
                         appManage,
						 versionManage,
                         homePage,
						 componentManage,
                         componentManageSearch,
                         componentManageCount,
                         componentManageSite,
						 deploymentManage,
						 repositoryManage,
						 integrationManage,
						 improvementManage,
						 checkHisReport,
                         appProcess,
                         appReport,
                         appDetail,
                         appInfo,
                         appPackage,
                         editAppPackage,
                         testTask,
                         SecurityScanTask,
                         editTask,
                         editTestTask,
                         taskRecord,
                         assemblyLineDetail,
                         createAssemblyLine,
                         dictItem,
                         dictItemEdit,
                         flowList,
                         createFlow,
                         addGroupName,
                         taskList,
                         sctsTask,
                         navheadDetail,
                         trackerTask,
                         uranusTask,
                         odinTask,
                         message,
                         createNotification,
                         notificationDetail,
                         notificationManage,
                         updateNotification,
                         teamMem,
                         editFlow,
                         detailFlow,
                         flowCron,
                         flowNotify,
                         flowNotifyUser,
                         alertCtrl,
                         flowHistoryDetail,
                         flowHistoryDetailView,
                         leftColumn,
                         createVersion,
                         integrationManageForConfig,
                         integrationManageByStstem,
                         integrationManageForDocker,
                         deploymentListBySystem,
                         deploymentEnvInstance,
                         defineDeploymentStrategy,
                         defineDeploymentFlow,
                         integrationManageByStstem,
                         repositoryManageById,
                         repositoryManageBySystem,
                         repositoryManageByHealth,
                         flowManage,
                         epicView,
                         additionFlow,
                         versionCreate,
                         codeCreate,
                         viewTaskDetial,
                         createRepository
                         ], app)
};