import {
    Inject
} from 'business/decorator/decorator';

@Inject
class homePage {
    constructor($scope, DialogService,ReposService,$state,$stateParams,HttpService,FileUploader,$rootScope) {
        let vm = $scope;
        
        $rootScope.setSession=(appId,appName)=>{
            sessionStorage.setItem("appId", appId);
            sessionStorage.setItem("appName", appName);
        }

        //左侧菜单栏
        $scope.menus = [
            {
                name: '项目管理',
                state: 'topHead.overview.proManage',
                clazz: 'fa fa-laptop'
            },{
                name: '系统管理',
                state: 'topHead.overview.appManage',
                clazz: 'fa icon-edition'
            },{
                name: '版本管理',
                state: 'topHead.overview.versionManage',
                clazz: 'fa icon-assembly'
            },{
                name: '代码托管',
                state: 'topHead.overview.repositoryManage',
                clazz: 'fa icon-document'
            },{
                name: '持续集成',
                state: 'topHead.overview.integrationManage',
                clazz: 'fa icon-jurisdiction'
            },{
                name: '过程改进',
                state: 'topHead.overview.improvementManage',
                clazz: 'fa fa-umbrella'
            },{
                name: '构件仓库',
                state: 'topHead.overview.componentManage',
                clazz: 'fa icon-contrast'
            },{
                name: '流水线',
                state: 'topHead.overview.flowManage',
                clazz: 'fa icon-assurance'
            },{
                name: '自动化部署',
                state: 'topHead.overview.deploymentManage',
                clazz: 'fa icon-release'
            }];

        
        
        //初始化
        init();
        
      
        function init() {
            HttpService.get('overview/query/app').then(function (result) {
                vm.active = result.active;
                vm.offLine = result.offLine;
                vm.appNum=vm.active+ vm.offLine;
                vm.userNo=result.userNo;
                vm.jiraUrl=result.jiraUrl;
            });
            
            HttpService.get('overview/query/workItem').then(function (result) {
                vm.myWorkItems = strToJson(result.workItems);
                work();
            });
        	
            

            HttpService.get('overview/query/project').then(function (result) {
                vm.project=strToJson(result.project);
                vm.projectNum=vm.project.devloping+vm.project.suspend+vm.project.finish;
            });
            

            HttpService.get('overview/query/version').then(function (result) {
                vm.version=strToJson(result.version);
                vm.versionNum=vm.version.deploying+vm.version.freezen+vm.version.deployed+vm.version.archive;
            });
            
        	var params={
        			operator:'my'
        	}
        	HttpService.get('events/',params).then(d=>{
        		if(d.eventDOListRespVO && d.eventDOListRespVO.theListData ){
        			vm.listone = d.eventDOListRespVO.theListData;
        		}
        		// vm.listone = [{"operateTime":"1492392458514","operator":"10010255(迟微)","body":"2222dsssssssssssssssssss"}]
        	});
        }
        
        
        function strToJson(str){ 
        	var json = (new Function("return " + str))(); 
        	return json; 
        	}
       vm.clickShow = 1;
        vm.switchEff = (num)=>{
            vm.clickShow = num; 
        };
        vm.clickNoShow = false;
      // $(".littleRound").style.display="none";
        function work(){
        vm.option1 = {
            title: {
                text: '0',
                subtext: '待处理',
                link:vm.jiraUrl+'/issues/?jql=assignee = '+vm.userNo+' and status != Closed',
                x: 'center',
                y: 'center',
                itemGap: 20,
                textStyle: {
                    color: 'rgba(30,144,255,0.8)',
                    fontFamily: '微软雅黑',
                    fontSize: 35,
                    fontWeight: 'bolder'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',

            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },

                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],

                    data: [
                        { value: vm.myWorkItems.pending.requireMents, name: '需求', src: vm.jiraUrl+'/issues/?jql=assignee = '+vm.userNo+' and status != Closed and issuetype= 原始业务需求' },
                        { value: vm.myWorkItems.pending.tasks, name: '任务', src: vm.jiraUrl+'/issues/?jql=assignee = '+vm.userNo +' and status != Closed and issuetype= 任务' },
                        { value: vm.myWorkItems.pending.bugs, name: '缺陷', src: vm.jiraUrl+'/issues/?jql=assignee = '+vm.userNo +' and status != Closed and issuetype= 缺陷' },
                       
                    ]
                }
            ]
        };
        vm.option1.series[vm.option1.series.length-1].data.forEach((e)=>{
            vm.option1.title.text = parseInt(vm.option1.title.text) + parseInt(e.value);
        });
        var myChart1 = echarts.init(document.getElementById('main1'));
        myChart1.clear();
        myChart1.setOption(vm.option1);
        myChart1.on('click', function (params) {
            let src = params.data.src;
            window.open(src);
        });

        vm.option2 = {
            title: {
                text: '0',
                subtext: '我关注',
                link: vm.jiraUrl+'/issues/?jql=watcher = '+vm.userNo+' and status != Closed',
                x: 'center',
                y: 'center',
                itemGap: 20,
                textStyle: {
                    color: 'rgba(30,144,255,0.8)',
                    fontFamily: '微软雅黑',
                    fontSize: 35,
                    fontWeight: 'bolder'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',

            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },

                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],

                    data: [
                        { value: vm.myWorkItems.focus.requireMents, name: '需求', src: vm.jiraUrl+'/issues/?jql=watcher = '+vm.userNo+' and status != Closed and issuetype= 原始业务需求' },
                        { value: vm.myWorkItems.focus.tasks, name: '任务' , src: vm.jiraUrl+'/issues/?jql=watcher = '+vm.userNo+' and status != Closed and issuetype= 任务'},
                        { value: vm.myWorkItems.focus.bugs, name: '缺陷' , src: vm.jiraUrl+'/issues/?jql=watcher = '+vm.userNo+' and status != Closed and issuetype= 缺陷'},
                    ]
                }
            ]
        };
        vm.option2.series[vm.option1.series.length-1].data.forEach((e)=>{
            vm.option2.title.text = parseInt(vm.option2.title.text) + parseInt(e.value);
        });
        var myChart2 = echarts.init(document.getElementById('main2'));
        myChart2.clear();
        myChart2.setOption(vm.option2);
        myChart2.on('click', function (params) {
            let src = params.data.src;
            window.open(src);
        });

        vm.option3 = {
            title: {
                text: '0',
                subtext: '我创建',
                link:  vm.jiraUrl +'/issues/?jql=reporter = '+vm.userNo+' and status != Closed',
                x: 'center',
                y: 'center',
                itemGap: 20,
                textStyle: {
                    color: 'rgba(30,144,255,0.8)',
                    fontFamily: '微软雅黑',
                    fontSize: 35,
                    fontWeight: 'bolder'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',

            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },

                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],

                    data: [
                        { value: vm.myWorkItems.created.requireMents, name: '需求', src: vm.jiraUrl +'/issues/?jql=reporter = '+vm.userNo+' and status != Closed and issuetype= 原始业务需求' },
                        { value: vm.myWorkItems.created.tasks, name: '任务' , src: vm.jiraUrl +'/issues/?jql=reporter = '+vm.userNo+' and status != Closed and issuetype= 任务'},
                        { value: vm.myWorkItems.created.bugs, name: '缺陷' , src: vm.jiraUrl +'/issues/?jql=reporter = '+vm.userNo+' and status != Closed and issuetype= 缺陷'},
                    ]
                }
            ]
        };
        vm.option3.series[vm.option3.series.length-1].data.forEach((e)=>{
            vm.option3.title.text = parseInt(vm.option3.title.text) + parseInt(e.value);
        });
        var myChart3 = echarts.init(document.getElementById('main3'));
        myChart3.clear();
        myChart3.setOption(vm.option3);
        myChart3.on('click', function (params) {
            let src = params.data.src;
            window.open(src);
        });
        }
        vm.square =[];
        //vm.square =[{"num":10,"name":"我的项目","detailIfon":[{"name":"立项中","num":2},{"name":"运行中","num":2},{"name":"已上线","num":2},{"name":"已立项","num":2}]},{"num":10,"name":"我的应用","detailIfon":[{"name":"立项中","num":2},{"name":"运行中","num":2},{"name":"已上线","num":2},{"name":"已立项","num":2}]},{"num":10,"name":"我的版本","detailIfon":[{"name":"立项中","num":2},{"name":"运行中","num":2},{"name":"已上线","num":2},{"name":"已立项","num":2}]}]
      //  vm.listone = [{"state":"置顶","content":"关于Struts2漏洞紧急通知"},{"state":"置顶","content":"关于Struts2漏洞紧急通知"},{"state":"置顶","content":"关于Struts2漏洞紧急通知"},{"state":"置顶","content":"关于Struts2漏洞紧急通知"}]
   
    }
}

export default app =>app.controller('homePage', homePage)

