export default app => {
    app.filter('operation_mapping', function () {
        return function (operation) {
            if (operation == 'start') {
                return "启动";
            }
            if (operation == 'restart') {
                return "重启";
            }
            if (operation == 'refresh') {
                return "刷新";
            }
            if (operation == 'stop') {
                return "停止";
            }
            return "无效操作";
        }
    })
    app.filter('protected_branch', function () {
        return function (is_protected) {
            if (is_protected == '1') {
                return "保护分支";
            }
            return "常规分支";
        }
    })
    app.filter('pullrequest_status', function () {
        return function (status) {
            if (status == '1') {
                return "待评审";
            }
            if (status == '2') {
                return "待审批";
            }
            if (status == '3') {
                return "评审不通过";
            }
            if (status == '0') {
                return "已关闭";
            }
            return "已合并";
        }
    })
    app.filter('codeReviewFilter', function () {
        return function (status) {
            if (status == '10') {
                return "使用gerrit进行代码评审";
            }
            if (status == '0') {
                return "无代码评审";
            }
            if (status == '11') {
                return "使用reviewboard进行代码评审";
            }
            return "未知状态";
        }
    })
    app.filter('gitVisibilityLevelFilter', function () {
        return function (status) {
            if (status == '0') {
                return "私有";
            }
            if (status == '10') {
                return "内部";
            }
            if (status == '20') {
                return "公开";
            }
            return "未知状态";
        }
    })
    
    
    app.filter('delayFilter', function () {
        return function (status) {
            if (status == '0') {
                return "立即执行";
            }
            if (status == '10') {
                return "10分钟";
            }
            if (status == '30') {
                return "30分钟";
            }
            if (status == '60') {
                return "60分钟";
            }
            return "";
        }
    })
    
    
    app.filter('checkTypeFilter', function () {
        return function (status) {
            if (status == '0') {
                return "默认";
            }
            if (status == '1') {
                return "所有";
            }
          
            return "";
        }
    })
    app.filter('filterEmpty', function () {
        return function (list, value) {

            return value ? list : [];
        };
    });
    app.filter("numberLimit", function () {
        return function (list, number) {;
            list = list || [];
            if (list.length > number) {
                list.splice(number, list.length);
            }
            return list;
        }
    });
    app.filter("ChangeCode",function () {
        return function (inputData) {
            if(!inputData){
                return "";
            }
            var changed=formatSeconds(inputData);
            return changed;
        }
    });

    function formatSeconds(value) {
        var theTime = parseInt(value)/1000;// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if(theTime > 60) {
            theTime1 = parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
                theTime2 = parseInt(theTime1/60);
                theTime1 = parseInt(theTime1%60);
            }
        }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
            result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
            result = ""+parseInt(theTime2)+"小时"+result;
        }
        return result;
    }
    
    app.filter('taskStatusFilter', function () {
        return function (status) {
            if (status == '1') {
                return "执行中";
            }
            if (status == '2') {
                return "执行成功";
            }
            if (status == '-2') {
                return "执行失败";
            }
            return "";
        }
    })
    
    
    app.filter('testTypeFilter', function () {
        return function (status) {
            if (status == 'caseType') {
                return "测试用例";
            }
            if (status == 'stepType') {
                return "测试步骤";
            }
           
            return "";
        }
    })
    
    app.filter('paramKeyFilter', function () {
        return function (status) {
            if (status == 'SCTS_BLOCK_NUMBER') {
                return "阻断数";
            }
            if (status == 'SCTS_SUCCESS_NUMBER') {
                return "成功数";
            }
            if (status == 'SCTS_SKIP_NUMBER') {
                return "跳过数";
            }
            if (status == 'SCTS_SUCCESS_RATE') {
                return "成功率";
            }
            if (status == 'SCTS_FAILURE_NUMBER') {
                return "失败数";
            }
            return "";
        }
    })
    
    
     app.filter('commonStatusFiler', function () {
        return function (status) {
            if (status == '0') {
                return "已废弃";
            }
            if (status == '1') {
                return "使用中";
            }
            return "";
        }
    })
    
      app.filter('appStatusFiler', function () {
        return function (status) {
            if (status == '0') {
                return "已注销";
            }
            if (status == '1') {
                return "运行中";
            }
            return "";
        }
    })
    
    
     app.filter('appGradeFiler', function () {
        return function (status) {
            if (status == '1') {
                return "一级";
            }
            if (status == '2') {
                return "二级";
            }
            if (status == '3') {
                return "三级";
            }
            return "";
        }
    })
    
     app.filter('versionStatusFilter', function () {
        return function (status) {
            if (status == '1') {
                return "开发中";
            }
            if (status == '2') {
                return "已封板";
            }
            if (status == '3') {
                return "已发布";
            }
            if (status == '4') {
                return "已归档";
            }
            if (status == '0') {
                return "已删除";
            }
            return "";
        }
    })

    app.filter('buildConfigFilter', function () {
        return function (buildConfigList,reposId) {
            if(buildConfigList&&buildConfigList.length>0){
               return buildConfigList.filter(function (it) {
                    return it.reposId==reposId && (it.buildOrder=='3' || it.buildOrder=='9' || it.buildOrder=='10');
                });
            }
            return [];
        }
    })
    
  
    
      app.filter('appNameFilter', function () {
        return function (appName) {
            if (appName) {
                return appName.toUpperCase();
            }
            return "";
        }
    })
    
    
};