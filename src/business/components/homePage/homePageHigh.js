import {
    Inject
} from 'business/decorator/decorator';

@Inject
class homePage {
    constructor($scope, DialogService, ReposService, $state, $stateParams, HttpService, FileUploader, $rootScope,$timeout,serve) {
        let vm = $scope;
        vm.detail = '<p style="color:red">dsff</p>';
        vm.down_notification = false;
        vm.up_notification = false;
       $timeout(function(){  
                    $(".content1").each(function(i){
                    var divH = $(this).height();
                    var $p = $("p", $(this)).eq(0);
                    while ($p.outerHeight() > divH) {
                    $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
                };
            });
        },1000); 
        vm.goMore = (n) =>{
            if(n == 1){
                serve.setValue(1);
            }else{
                serve.setValue(2);
            }
        }
  
        vm.items = []
        
        $rootScope.setSession = (appId, appName) => {
            sessionStorage.setItem("appId", appId);
            sessionStorage.setItem("appName", appName);
        }
        //点击黑板报名称，弹出详情
        vm.boardShow = boardId =>{

        	vm.up_notification = false;
        	vm.down_notification = false;
	        //console.log(boardId);
	        
	        var location = 0;
	        vm.notificationIdList.forEach((e,i) =>{
                if(e == boardId){
                	location = i;
                	
                    return false;
                }
                return true;
            });
	        
	        if(location == 0){
	        	vm.up_notification = true;
	        	
	        }else if(location == vm.notificationIdList.length-1){
	        	vm.down_notification = true;
	        	
	        }else{
	        	vm.up_notification = false;
	        	vm.down_notification = false;
	        }
	        
	        HttpService.get('notifications/'+boardId).then(d=>{
	    		vm.notificationDO = d;
	    		if(vm.notificationDO.attachmentLink != null){
	    			var words = vm.notificationDO.attachmentLink.split('/');
	    			if(words.length > 0){
	    				vm.notificationDO.fileName = words[words.length-1];
	    			}
	    		}
	            vm.popShow = true;
	    	});
	        vm.currentID = boardId;
        }
        //黑板报详情  下一步
        vm.nextStep =() =>{
        	
	        vm.notificationIdList.forEach((e,i) =>{
                if(e == vm.currentID){
                	
                	vm.sequenceID = i+1;
                    return false;
                }
                return true;
            });
	        
	        if(vm.sequenceID == 0){
	        	vm.up_notification = true;
	        	return true;
	        }else if(vm.sequenceID == vm.notificationIdList.length-1){
	        	vm.down_notification = true;
	        	//return true;
	        }else{
	        	vm.up_notification = false;
	        	vm.down_notification = false;
	        }
            HttpService.get('notifications/'+ vm.notificationIdList[vm.sequenceID]).then(d=>{
        		vm.notificationDO = d;
        		if(vm.notificationDO.attachmentLink != null){
        			var words = vm.notificationDO.attachmentLink.split('/');
        			if(words.length > 0){
        				vm.notificationDO.fileName = words[words.length-1];
        			}
        		}
                vm.popShow = true;
                vm.currentID = vm.notificationIdList[vm.sequenceID];
        	});
             
        }
        
         //黑板报详情  上一步
        vm.previousStep =() =>{
            vm.down_notification = false;
            vm.notificationIdList.every((e,i) =>{
                if(e == vm.currentID){
                    vm.sequenceID = i-1;
                    return false;
                }
                return true;
            })
            
            if(vm.sequenceID == 0){
	        	vm.up_notification = true;
	        	//return true;
	        }else if(vm.sequenceID == vm.notificationIdList.length){
	        	vm.down_notification = true;
	        	return true;
	        }else{
	        	vm.up_notification = false;
	        	vm.down_notification = false;
	        }
            
            HttpService.get('notifications/'+ vm.notificationIdList[vm.sequenceID]).then(d=>{
        		vm.notificationDO = d;
        		
        		if(vm.notificationDO.attachmentLink != null){
        			var words = vm.notificationDO.attachmentLink.split('/');
        			if(words.length > 0){
        				vm.notificationDO.fileName = words[words.length-1];
        			}
        		}
        		
                vm.popShow = true;
                vm.currentID = vm.notificationIdList[vm.sequenceID];
        	});
             
        }
        
        vm.popHide = function(){
            vm.popShow = false;
        }
        //左侧菜单栏
        $scope.menus = [{
            name: '项目管理',
            state: 'topHead.overview.proManage',
            clazz: 'fa fa-laptop'
        }, {
            name: '系统管理',
            state: 'topHead.overview.appManage',
            clazz: 'fa icon-edition'
        }, {
            name: '版本管理',
            state: 'topHead.overview.versionManage',
            clazz: 'fa icon-assembly'
        }, {
            name: '代码托管',
            state: 'topHead.overview.repositoryManage',
            clazz: 'fa icon-document'
        }, {
            name: '持续集成',
            state: 'topHead.overview.integrationManage',
            clazz: 'fa icon-jurisdiction'
        }, {
            name: '过程改进',
            state: 'topHead.overview.improvementManage',
            clazz: 'fa fa-umbrella'
        }, {
            name: '构件仓库',
            state: 'topHead.overview.componentManage',
            clazz: 'fa icon-contrast'
        }, {
            name: '流水线',
            state: 'topHead.overview.flowManage',
            clazz: 'fa icon-assurance'
        }, {
            name: '自动化部署',
            state: 'topHead.overview.deploymentManage',
            clazz: 'fa icon-release'
        }];


        //http://tyrsit.cnsuning.com/#/log/auditLogs
        
        vm.tyrUrl='http://tyrsit.cnsuning.com/#/log/auditLogs';
        
        if (location.hostname.match('sit')) {
        	vm.tyrUrl = "http://tyrsit.cnsuning.com/#/log/auditLogs";
        } else if (location.hostname.match("dev")) {
        	vm.tyrUrl = "http://tyrsit.cnsuning.com/#/log/auditLogs";
        } else if (location.hostname.match('pre')) {
        	vm.tyrUrl = "http://tyr.cnsuning.com/#/log/auditLogs";
        } else {
        	vm.tyrUrl = "http://tyr.cnsuning.com/#/log/auditLogs";
        }
        
        //初始化
        init();


        function init() {
        	var params={
        			page:0,
        			pageSize:10000
        	}
            HttpService.post('overview/query/app?page='+params.page+'&pageSize='+params.pageSize).then(function (result) {
                vm.active = result.active;
                vm.offLine = result.offLine;
                vm.appNum = vm.active + vm.offLine;
                vm.userNo = result.userNo;
                vm.jiraUrl = result.jiraUrl;
                HttpService.get('overview/query/workItem').then(function (result) {
                    vm.myWorkItems = strToJson(result.workItems);
                    if (vm.myWorkItems.created) {
                        vm.myWorkItems.created.name = '我创建'
                        vm.myWorkItems.created.link = vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype in(原始业务需求,需求,缺陷,任务,子任务)'
                        vm.myWorkItems.created.src0 = vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype in(原始业务需求,需求)'
                        vm.myWorkItems.created.src1 = vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype in (任务,子任务)'
                        vm.myWorkItems.created.src2 = vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype= 缺陷'
                    }
                    if (vm.myWorkItems.pending) {
                        vm.myWorkItems.pending.name = '待处理'
                        vm.myWorkItems.pending.link = vm.jiraUrl + '/issues/?jql=assignee = ' + vm.userNo + ' and status != Closed and issuetype in(原始业务需求,需求,缺陷,任务,子任务)'
                        vm.myWorkItems.pending.src0 = vm.jiraUrl + '/issues/?jql=assignee = ' + vm.userNo + ' and status != Closed and issuetype in(原始业务需求,需求)'
                        vm.myWorkItems.pending.src1 = vm.jiraUrl + '/issues/?jql=assignee = ' + vm.userNo + ' and status != Closed and issuetype in (任务,子任务)'
                        vm.myWorkItems.pending.src2 = vm.jiraUrl + '/issues/?jql=assignee = ' + vm.userNo + ' and status != Closed and issuetype= 缺陷'
                    }
                    if (vm.myWorkItems.focus) {
                        vm.myWorkItems.focus.name = '我关注'
                        vm.myWorkItems.focus.link = vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype in(原始业务需求,需求,缺陷,任务,子任务)'
                        vm.myWorkItems.focus.src0 = vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype in(原始业务需求,需求)'
                        vm.myWorkItems.focus.src1 = vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype in (任务,子任务)'
                        vm.myWorkItems.focus.src2 = vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype= 缺陷'
                    }
                    vm.items.push(vm.myWorkItems.pending)
                    vm.items.push(vm.myWorkItems.focus)
                    vm.items.push(vm.myWorkItems.created)
                    work();
                });
            });

            HttpService.get('overview/query/project').then(function (result) {
                vm.project = strToJson(result.project);
                vm.projectNum = vm.project.devloping + vm.project.suspend + vm.project.finish;
            });


            HttpService.get('overview/query/version').then(function (result) {
                vm.version = strToJson(result.version);
                vm.versionNum = vm.version.deploying + vm.version.freezen + vm.version.deployed + vm.version.archive;
            });

            var params = {
                	page:1,
                	pageSize:100
            }
            HttpService.get('events/tyr', params).then(d => {
                if (d.eventDOListRespVO) {
                	var obj = JSON.parse(d.eventDOListRespVO);
                    vm.listone = obj.data;
                }
            });

            HttpService.get('notifications/homepage').then(d => {
                if (null == d.notificationDOListRespVO) {
                    vm.notificationDOListRespVO = null;
                } else {
                    d.notificationDOListRespVO.forEach((e, i) => {
                    	
                		if(e.attachmentLink != null){
                			var words = e.attachmentLink.split('/');
                			if(words.length > 0){
                				e['fileName'] = words[words.length-1];
                			}
                		}
                		
                		if(e.type == 'notice'){
                			e.typeName = '通知';
                		}else if(e.type == 'announcement'){
                			e.typeName = '公告';
                		}else if(e.type == 'regulation'){
                			e.typeName = '规范';
                		}else{
                			e.typeName = '未知';
                		}
    				});
                    
                    vm.notificationDOListRespVO = d.notificationDOListRespVO;
                }
            });
            
            HttpService.get('notifications/id').then(d=>{
	    		vm.notificationIdList = d.ids;
	        });
        }


        function strToJson(str) {
            var json = (new Function("return " + str))();
            return json;
        }
        vm.clickShow = 1;
        vm.switchEff = (num) => {
            vm.clickShow = num;
        };
        vm.changeTitle = (n) => {
            if (n == 1) {
                window.open(vm.items[1].link)
            } else {
                window.open(vm.items[2].link)
            }
            event.stopImmediatePropagation();
        };

        vm.clickNoShow = false;
        // $(".littleRound").style.display="none";
        function work() {
            vm.option1 = {
                title: {
                    text: '0',
                    subtext: vm.items[0].name,
                    link: vm.items[0].link,
                    x: 'center',
                    y: 'center',
                    itemGap: 20,
                    textStyle: {
                        color: '#5A5C80',
                        fontWeight: 'lighter',
                        fontSize: 30
                    },
                    subtextStyle: {
                        color: '#5A5C80 ',
                        fontWeight: 'lighter',
                        fontSize: 25
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params){
                        if(params.value === 0){
                            return params.seriesName+"</br>"+params.name+":"
                            +params.value+"("+0+"%)";
                        }else{
                            return params.seriesName+"</br>"+params.name+":"
                            +params.value+"("+params.percent+"%)";
                        }
                    }
                    //formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',

                },
                series: [{
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
                        radius: ['42%', '62%'],

                        data: [{
                                value: vm.items[0].requireMents,
                                name: '需求',
                                src: vm.items[0].src0,
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: '#FFE200' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#FFAC00' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    },
                                    emphasis: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: '#FFE400' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#FFAB00' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                }
                            },
                            {
                                value: vm.items[0].tasks,
                                name: '任务',
                                src: vm.items[0].src1,
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: '#68DD0A' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#00DBC2' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    },
                                    emphasis: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: '#68DD0A' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#00DBC2' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                }
                            },
                            {
                                value: vm.items[0].bugs,
                                name: '缺陷',
                                src: vm.items[0].src2,
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: '#FF215B' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#F86565' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    },
                                    emphasis: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 1,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: '#FF215B' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#F86565' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        }
                                    }
                                }
                            },

                        ]
                    }
                ]
            };
            vm.option1.series[vm.option1.series.length - 1].data.forEach((e) => {
                vm.option1.title.text = parseInt(vm.option1.title.text) + parseInt(e.value);
            });
            var myChart1 = echarts.init(document.getElementById('homePageEchartBox'));
            myChart1.clear();
            myChart1.setOption(vm.option1);
            myChart1.on('click', function (params) {
                let src = params.data.src;
                window.open(src);
            });

            vm.changeChart = n => {
                let t = vm.items[n]
                vm.items[n] = vm.items[0]
                vm.items[0] = t
                let option1 = {
                    title: {
                        text: '0',
                        subtext: vm.items[0].name,
                        link: vm.items[0].link,
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
                    series: [{
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
                            radius: ['42%', '62%'],

                            data: [{
                                    value: vm.items[0].requireMents,
                                    name: '需求',
                                    src: vm.items[0].src0,
                                    itemStyle: {
                                        normal: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: '#FFE400' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#FFAB00' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            }
                                        },
                                        emphasis: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: '#FFE400' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#FFAB00' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            }
                                        }
                                    }
                                },
                                {
                                    value: vm.items[0].tasks,
                                    name: '任务',
                                    src: vm.items[0].src1,
                                    itemStyle: {
                                        normal: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: '#68DD0A' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#00DBC2' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            }
                                        },
                                        emphasis: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: '#68DD0A' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#00DBC2' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            }
                                        }
                                    }
                                },
                                {
                                    value: vm.items[0].bugs,
                                    name: '缺陷',
                                    src: vm.items[0].src2,
                                    itemStyle: {
                                        normal: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: '#FF215B' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#F86565' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            }
                                        },
                                        emphasis: {
                                            color: {
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0,
                                                    color: '#FF215B' // 0% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#F86565' // 100% 处的颜色
                                                }],
                                                globalCoord: false // 缺省为 false
                                            }
                                        }
                                    }
                                },

                            ]
                        }
                    ]
                };
                option1.series[option1.series.length - 1].data.forEach((e) => {
                    option1.title.text = parseInt(option1.title.text) + parseInt(e.value);
                });
                myChart1.setOption(option1)
            }

            // vm.option2 = {
            //     title: {
            //         text: '0',
            //         subtext: '我关注',
            //         link: vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed',
            //         x: 'center',
            //         y: 'center',
            //         itemGap: 20,
            //         textStyle: {
            //             color: 'rgba(30,144,255,0.8)',
            //             fontFamily: '微软雅黑',
            //             fontSize: 35,
            //             fontWeight: 'bolder'
            //         }
            //     },
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: "{a} <br/>{b}: {c} ({d}%)"
            //     },
            //     legend: {
            //         orient: 'vertical',
            //         x: 'left',

            //     },
            //     series: [{
            //             name: '访问来源',
            //             type: 'pie',
            //             selectedMode: 'single',
            //             radius: [0, '30%'],

            //             label: {
            //                 normal: {
            //                     position: 'inner'
            //                 }
            //             },
            //             labelLine: {
            //                 normal: {
            //                     show: false
            //                 }
            //             },

            //         },
            //         {
            //             name: '访问来源',
            //             type: 'pie',
            //             radius: ['40%', '55%'],

            //             data: [{
            //                     value: vm.myWorkItems.focus.requireMents,
            //                     name: '需求',
            //                     src: vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype= 原始业务需求'
            //                 },
            //                 {
            //                     value: vm.myWorkItems.focus.tasks,
            //                     name: '任务',
            //                     src: vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype= 任务'
            //                 },
            //                 {
            //                     value: vm.myWorkItems.focus.bugs,
            //                     name: '缺陷',
            //                     src: vm.jiraUrl + '/issues/?jql=watcher = ' + vm.userNo + ' and status != Closed and issuetype= 缺陷'
            //                 },
            //             ]
            //         }
            //     ]
            // };
            // vm.option2.series[vm.option1.series.length - 1].data.forEach((e) => {
            //     vm.option2.title.text = parseInt(vm.option2.title.text) + parseInt(e.value);
            // });
            // var myChart2 = echarts.init(document.getElementById('main2'));
            // myChart2.clear();
            // myChart2.setOption(vm.option2);
            // myChart2.on('click', function (params) {
            //     let src = params.data.src;
            //     window.open(src);
            // });

            // vm.option3 = {
            //     title: {
            //         text: '0',
            //         subtext: '我创建',
            //         link: vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed',
            //         x: 'center',
            //         y: 'center',
            //         itemGap: 20,
            //         textStyle: {
            //             color: 'rgba(30,144,255,0.8)',
            //             fontFamily: '微软雅黑',
            //             fontSize: 35,
            //             fontWeight: 'bolder'
            //         }
            //     },
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: "{a} <br/>{b}: {c} ({d}%)"
            //     },
            //     legend: {
            //         orient: 'vertical',
            //         x: 'left',

            //     },
            //     series: [{
            //             name: '访问来源',
            //             type: 'pie',
            //             selectedMode: 'single',
            //             radius: [0, '30%'],

            //             label: {
            //                 normal: {
            //                     position: 'inner'
            //                 }
            //             },
            //             labelLine: {
            //                 normal: {
            //                     show: false
            //                 }
            //             },

            //         },
            //         {
            //             name: '访问来源',
            //             type: 'pie',
            //             radius: ['40%', '55%'],

            //             data: [{
            //                     value: vm.myWorkItems.created.requireMents,
            //                     name: '需求',
            //                     src: vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype= 原始业务需求'
            //                 },
            //                 {
            //                     value: vm.myWorkItems.created.tasks,
            //                     name: '任务',
            //                     src: vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype= 任务'
            //                 },
            //                 {
            //                     value: vm.myWorkItems.created.bugs,
            //                     name: '缺陷',
            //                     src: vm.jiraUrl + '/issues/?jql=reporter = ' + vm.userNo + ' and status != Closed and issuetype= 缺陷'
            //                 },
            //             ]
            //         }
            //     ]
            // };
            // vm.option3.series[vm.option3.series.length - 1].data.forEach((e) => {
            //     vm.option3.title.text = parseInt(vm.option3.title.text) + parseInt(e.value);
            // });
            // var myChart3 = echarts.init(document.getElementById('main3'));
            // myChart3.clear();
            // myChart3.setOption(vm.option3);
            // myChart3.on('click', function (params) {
            //     let src = params.data.src;
            //     window.open(src);
            // });
        }
        vm.square = [];
        //vm.square =[{"num":10,"name":"我的项目","detailIfon":[{"name":"立项中","num":2},{"name":"运行中","num":2},{"name":"已上线","num":2},{"name":"已立项","num":2}]},{"num":10,"name":"我的应用","detailIfon":[{"name":"立项中","num":2},{"name":"运行中","num":2},{"name":"已上线","num":2},{"name":"已立项","num":2}]},{"num":10,"name":"我的版本","detailIfon":[{"name":"立项中","num":2},{"name":"运行中","num":2},{"name":"已上线","num":2},{"name":"已立项","num":2}]}]
        //  vm.listone = [{"state":"置顶","content":"关于Struts2漏洞紧急通知"},{"state":"置顶","content":"关于Struts2漏洞紧急通知"},{"state":"置顶","content":"关于Struts2漏洞紧急通知"},{"state":"置顶","content":"关于Struts2漏洞紧急通知"}]

    }
}

export default app => app.controller('homePage', homePage)