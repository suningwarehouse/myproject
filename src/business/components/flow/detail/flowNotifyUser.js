/**
 * Created by 17030515 on 2017/6/16.
 */
import {
    Inject
} from 'business/decorator/decorator'
@Inject
class FlowNotifyUserCtrl {
    constructor($scope, DialogService, userService, AlertService, $filter, $timeout, $state, $interval, $q, $rootScope) {
        let vm = $scope;
        let names = ['sendUser', 'sendCc'];

        let select2option = {
            maximumSelectionLength: 100,
            ajax: {
                processResults: (data) => {
                    data = (data || []);
                    return {
                        results: data
                    };
                },
                transport: function (params, success, failure) {
                    var deferred = $q.defer();
                    var p = deferred.promise
                    if (!params.data.term || params.data.term.length < 8) {
                        if (params.data.term == undefined) {
                            params.data.term = 1
                        }
                        ;
                        let filterList1 = $filter('filterEmpty')(vm.users, params.data.term);
                        let filterList2 = $filter('filter')(filterList1, params.data.term);
                        let filterList3 = $filter('numberLimit')(filterList2, 6);
                        deferred.resolve(filterList3);
                    } else {
                        let user = vm.users.find(n => n.id === params.data.term)
                        if (user) {
                            deferred.resolve([user])
                        } else {
                            if (/^\d{8,12}$/.test(params.data.term)) {

                                userService.getAndUpdateUser(params.data.term).then(e => {
                                    let user = e.find(n => n.code === params.data.term);
                                    if (!user) {
                                        deferred.resolve([])
                                    } else {
                                        deferred.resolve([user]);
                                    }
                                    e.forEach(e => {
                                        e.text = e.name;
                                        e.id = e.code;
                                    })
                                    vm.users = e;
                                })
                            } else {
                                deferred.resolve([])
                            }
                        }
                    }
                    return p.then(success, failure)
                }
            }
        }
        names.forEach(e => {
            vm[e + 'select2option'] = angular.copy(select2option)
        });

        $('select[select2]').on('select2:open', e => {
            $('select[select2]+span.select2 input.select2-search__field').attr('maxlength', 12)
        });
        vm.sendUserList = [];
        vm.sendCcList = [];

        vm.sendUserTmpList=[];
        vm.sendCcTmpList=[];
        init();
        function init() {
            if(vm.data.notify.sendUser){
                var list=angular.fromJson(vm.data.notify.sendUser);
                vm.sendUserTmpList=list;
            }

            if(vm.data.notify.sendCc){
                var list=angular.fromJson(vm.data.notify.sendCc);
                vm.sendCcTmpList=list;
            }

            //初始化用户
            userService.getSelectUsers().then(function (result) {
                vm.users = result;
                vm.users.forEach(e => {
                    e.text = e.name;
                    e.id = e.code
                });

                //select2赋值
                names.forEach(e => {
                    let repeat = vm[e + 'Repeat'] = []
                    vm[e + 'TmpList'] && vm[e + 'TmpList'].forEach(d => {
                        repeat.push(vm.users.find(n => n.code === d))
                    })
                    vm[e + 'List'] = angular.copy(repeat)
                    $scope.$watch(e + 'List', (newValue, oldValue) => {
                        vm[e + 'TmpList'] = []
                        newValue && newValue.forEach(d => {
                            vm[e + 'TmpList'].push(d.id)
                        })
                    }, true)
                    $timeout(() => {
                        console.log(e);
                        vm[e + 'select2option'].reset();
                    })
                })
            });


        }

        vm.close = () => {
            // way 1:
            DialogService.dismiss(vm.key);
            // or
            DialogService.refuse(vm.key, 'dialog refuse! cancel!');
        };

        vm.save = ()=> {
            if(!vm.sendUserTmpList||vm.sendUserTmpList.length<1){
                return AlertService.alert({title: "提示", content: "发送人不能为空！"});
            }
            if(vm.sendUserTmpList.length>0){
                vm.data.notify.sendUser=angular.toJson(vm.sendUserTmpList);
            }

            vm.data.notify.sendCc="";

            if(vm.sendCcTmpList.length>0){
                vm.data.notify.sendCc=angular.toJson(vm.sendCcTmpList);
            }
            vm.close();
        }
    }
}

export default app => app.controller('FlowNotifyUserCtrl', FlowNotifyUserCtrl)