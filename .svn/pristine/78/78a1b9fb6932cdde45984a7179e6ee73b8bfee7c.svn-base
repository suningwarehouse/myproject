// 基础组件部分，一般都需要加载
import angular from 'angular';
import core from './core';
// import http from './httpServer/httpServer';
import http from '@suning/dubhe-component-http';
import perm from '@suning/cd-perm';
//import modal from './modal/modal';
import selectNew from '@suning/cd-select-multi';
// 功能组件部分，根据需要确认是否加载
// common 自带组件，这些组件包含在dubhe-core核心代码包内
import breadcrumb from './breadcrumb';
//import datePicker from './dateRangePicker/dateRangePicker';
import iframe from '@suning/cd-iframe';
import dropdown from './dropdown/dropdown';
// import menu from './menu/menu';
//import pager from './pager/pager';
import tabs from './tabs/tabs';
import tooltip from './tooltip/tooltip';
import cdtip from "@suning/cd-tip";

// 非常用组件，这些组件是非常用组件，dubhe-core默认不包含这些组件，
// 如需使用，可以通过snpm进行依赖安装
// import contextmenu from 'sn-dubhe-component-contextmenu';
import draggable from '@suning/dubhe-component-draggable';
import echarts from '@suning/dubhe-component-echarts';
// import inputMask from 'sn-dubhe-component-inputMask';
// import markdown from 'sn-dubhe-component-markdown';
// import preview from 'sn-dubhe-component-preview';
// import progress from 'sn-dubhe-component-progress';
// import 'sn-dubhe-component-progress/lib/progress/progress.less';
import step from '@suning/dubhe-component-step';
import '@suning/dubhe-component-step/lib/step/step.less';
import select2 from '@suning/dubhe-component-select2';
import navbar from '@suning/cd-navbar';
import changdot from '@suning/dubhe-component-changdot';
import color from './colorBlocks/color';
import ueditor from './ueditor/ueditor';
import pager from '@suning/cd-pager';
import datePicker from '@suning/dubhe-component-daterangepicker';
import check from '@suning/cd-check-radio';
import modal from '@suning/dubhe-component-alertService';

// import tree from 'sn-dubhe-component-tree';
// import message from 'sn-dubhe-component-message'
// import alert from 'sn-dubhe-component-alert';

let app = angular.module("sn.dubhe.component", []);
http(app, {
    errorHandle: {
        resultCode: [{
            code: '03001',
            callback: function () {
                // if (!env) {
                //     env = http.loginService.detectEnv()
                //     logout = http.loginService[env + 'logout']
                // }
                http.loginService.logout({
                    beforeService: 'cupidAdminAuth=false',
                    service: location.origin + '/error.html'
                })
            }
        }],
        config: {
            successCode: '0',
            alertMessage: true,
            noMsgCode: '-1'
        },
        // appIdHandler: function (d) {
        //     if (d && d.resultCode !== '0') {
        //         if (!sessionStorage.getItem("appId")) {
        //             return {
        //                 message: '缺少应用Id'
        //             }
        //         }
        //     }
        // }
    },
    httpService: {
        httpLoading: 'manual'
    }
})

INCLUDE_ALL_MODULES(
    [
        core,
        modal,
        iframe,
        breadcrumb,
        datePicker,
        dropdown,
        color,
        // menu,
        pager,
        tabs,
        tooltip,
        // contextmenu,
        draggable,
        echarts,
        changdot,
        // inputMask,
        // markdown,
        // preview,
        // progress,
        select2,
        step,
        perm,
        cdtip,
        selectNew,
        ueditor,
        // tree,
        // message,
        // alert
        navbar,
        check
    ],
    app);

export default app;