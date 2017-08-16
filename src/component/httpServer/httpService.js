export default app => {
    app.service("HttpService", ["$http", "$q", "$document", "$location",
        "AlertService", "LoginService", "EventBus", "baseUrl", 'Loading', "ErrorHandle",
        function ($http, $q, $document, $location, AlertService, LoginService, EventBus, baseUrl, Loading, ErrorHandle) {
            var loginUrl = LoginService.config.base + 'authStatus?callback=JSON_CALLBACK&_t=' + (+new Date());

            function busy(url) {
                document.body.style.cssText = "cursor: progress !important";
                Loading(true, url)
            }

            function idle() {
                document.body.style.cssText = "";
                Loading(false)
            }

            function sendRequest(url, params, method, option) {
                let data, config
                var defer = $q.defer();
                if(!params.data || !params.data.notDisplayLoading){
                    busy(url);
                }

                resourceCode(option)

                if (method === 'post' || method === 'put') {
                    params.data && (params.data = JSON.stringify(params.data))
                }

                if (method === 'get' || method === 'delete') {
                    data = params
                } else {
                    data = params.data
                    config = {
                        headers: params.headers
                    }
                }

                $http.defaults.headers.common['currentUrl'] = location.href;

                $http[method](url, data, config).success(function (result) {
                    if(!params.data || !params.data.notDisplayLoading){
                        idle();
                    }

                    ErrorHandle.handle(result)
                        .then(function (data) {
                            defer.resolve(data);
                        }, function (data) {
                            defer.reject(data);
                        });

                    /*defer.resolve(result);
            
                    // errCode为500时出错统一处理
                    if(!!result.errorCode && result.errorCode == '500'){
                        AlertService.alert({
                            title: "服务端异常",
                            content: '系统出了点小问题，请稍后重试！'
                        });
                        defer.reject(result);
                    }else{
                        defer.resolve(result);
                    }*/
                }).error(function (reason, status) {
                    if(!params.data || !params.data.notDisplayLoading){
                        idle();
                    }

                    var errorContent = reason;
                    if (reason != undefined && reason.errorresponse != undefined) {
                        errorContent = reason.errorresponse.errortext;
                    }

                    if (status) {
                        AlertService.alert({
                            title: "服务端异常",
                            content: '系统出了点小问题，请稍后重试！'
                            //content: errorContent
                        });
                    }
                    defer.reject(reason);
                });

                return defer.promise;
            }

            function resourceCode(option) {
                if (option && option.resourceCode) {
                    $http.defaults.headers.common.resourceCode = option.resourceCode
                } else {
                    delete $http.defaults.headers.common.resourceCode
                }
            }

            function addHeaders(method, param) {
                switch (method) {
                    case 'get':
                        return {
                            params: param
                        }
                    case 'post':
                        return {
                            data: param || {},
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    case 'delete':
                        return {
                            data: JSON.stringify(param || {}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    case 'put':
                        return {
                            data: param || {},
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                }
            }

            function restful(httpType) {
                return function (url, param, option) {
                    var defer = $q.defer();

                    if (option && option.unrestricted) {
                        sendRequest(baseUrl + url, {
                            params: param
                        }, httpType).then(
                            function (result) {
                                defer.resolve(result);
                            },
                            function (data) {
                                defer.reject(data);
                            });
                    } else {
                        sendRequest(baseUrl + url, addHeaders(httpType, param), httpType).then(
                            function (result) {
                                defer.resolve(result);
                            },
                            function (data) {
                                defer.reject(data);
                            }
                        );
                    }

                    return defer.promise;
                }
            }

            return {
                "get": restful('get'),
                "post": restful('post'),
                "put": restful('put'),
                "delete": restful('delete'),
            };
        }
    ]);
}