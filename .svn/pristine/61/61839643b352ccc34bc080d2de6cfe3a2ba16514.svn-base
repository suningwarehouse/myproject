import {
    Inject
} from 'business/decorator/decorator'

@Inject
class topHead {
    constructor($scope, LoginService, $rootScope, UserService) {
        let vm = $scope;
         vm.loout = true;
        $scope.doLogout = function () {
        	LoginService.logout()
            //非sn passport
//            let cookies = document.cookie.split(';')
//            let authId
//            let is_cupid_auth = false
//            if (cookies) {
//                cookies.forEach(e => {
//                    if (/authId/.test(e)) {
//                        authId = e.trim()
//                    }
//                    if (/is_cupid_auth/.test(e)) {
//                        is_cupid_auth = true
//                    }
//                })
//            }
//            if (is_cupid_auth) {
//                document.cookie = 'is_cupid_auth=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.cnsuning.com; path=/;'
//                location.href = 'http://cupidsit.cnsuning.com/cupid/session/logout?' + authId + '&service=' + encodeURIComponent(location.origin) + baseUrl + 'auth?targetUrl=' + encodeURIComponent(location.href);
//                return
//            }
//
//            //sn passport
//            sessionStorage.removeItem("userName");
//            sessionStorage.removeItem("role");
//            sessionStorage.removeItem("roles");
//            if (location.host.match('pre')) {
//                window.location.href = 'https://ssopre.cnsuning.com/ids/logout?loginTheme=' + LoginService.config.loginTheme + '&service=' + encodeURIComponent(window.location.href)
//            } else if (location.host.match('dev') || location.host.match('sit')) {
//                window.location.href = 'https://ssosit.cnsuning.com/ids/logout?loginTheme=' + LoginService.config.loginTheme + '&service=' + encodeURIComponent(window.location.href)
//            } else {
//                window.location.href = 'https://sso.cnsuning.com/ids/logout?loginTheme=' + LoginService.config.loginTheme + '&service=' + encodeURIComponent(window.location.href)
//            }
        };
        vm.username = sessionStorage.getItem("userName");
        if (null == vm.username || vm.role == null) {
            UserService.getUserinfo().then(function (result) {
                vm.username = result.data.userName;
                sessionStorage.setItem("userName", result.data.userName);
                sessionStorage.setItem("role", result.data.role);
                sessionStorage.setItem("roles", JSON.stringify(result.data.roles));
                vm.$apply()
            });
        }

        window.addEventListener('blur', function ($event) {
            $event.stopPropagation();
            if (document.activeElement === document.querySelector('iframe')) {
                $('.dropdown').removeClass('open');
            }
        });

      
        
        
        // vm.baseUrl = baseUrl;

        vm.toggleSidebar = function () {
            $rootScope.menuShrink = !$rootScope.menuShrink;
            $rootScope.sidebarCollapsed = !$rootScope.sidebarCollapsed;
        };

        vm.toggleControlSidebar = function () {
            $rootScope.controlSidebarOpened = !$rootScope.controlSidebarOpened;
        };

        vm.logout = function () {
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("roles");
            UserService.logout().then(function () {
                location.reload();
            });

        };

    }
}
export default app => {
    app.controller('topHead', topHead);
    app.service("UserService", ["HttpService", "$q", function (HttpService, $q) {
        'use strict';

        return {
            "getUserinfo": function (params) {
                let userName, roles, role
                let p1 = HttpService.get("user/getFullName", params).then(d => {
                    userName = d
                });
                // let p2 = HttpService.get("user/getRoles", params).then(d => {
                //     roles = d.roles
                //     role = d.role
                // });
                return Promise.all([p1]).then(() => {
                    return {
                        "errMsg": "success",
                        "data": {
                            "roles": roles,
                            "role": role,
                            "userName": userName
                        },
                        "errCode": "0"
                    }
                })

            },
            "logout": function () {
                //// 获取用户数据，对接后台接口
                //	       return HttpService.get("/j_spring_security_logout");
                return HttpService.get("/cdlogout.htm");
            }
        };
    }]);
};
