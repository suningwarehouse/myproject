import angular from 'angular';
import alertTmpl from './alertTmpl.html';
import confirmTmpl from './confirmTmpl.html';
import {dialogDrag} from './dialogDrag';

export default app => {
    app.service("AlertService", ["$http", "$document", "$q", "$rootScope", "$compile","serveAlert",
        function ($http, $document, $q, $rootScope, $compile,serveAlert) {
       
            var zIndex = 1200;
            var dialogCounter = 0;

            // var mask = angular.element('<div class="modal-backdrop fade in"></div>');
            // mask.css("z-index", zIndex);

            var service = {
                alert: function (param) {
                    var alertstamp;
                    var alertmessage;
                    var ifPass = true;
                    if(serveAlert.getStamp().message == undefined){
                        alertstamp = Date.parse( new Date());
                        alertmessage = param.content;
                        serveAlert.setStamp(alertmessage,alertstamp)
                    }else{
                        var judgeMark = serveAlert.getStamp();
                        var stampNow = Date.parse( new Date());
                        var messageNow = param.content;
                        if((stampNow-judgeMark.stamp)<5*1000 && messageNow == judgeMark.message){
                            ifPass = false;
                        }
                    }
                    if(!ifPass){
                        return;
                    }
                    var defer = $q.defer();
                    var dialog;
                    dialogCounter++;

                    // if (dialogCounter == 1) {
                    //   $document.find("body").append(mask);
                    // }

                    var data = $rootScope.$new();
                    angular.extend(data, param);

                    data.ok = function () {
                        service.dismiss(dialog);
                        defer.resolve("ok");
                    };
                    data.close = function () {
                        service.dismiss(dialog);
                        defer.resolve("ok");
                    };
                    data.type = data.type || 'info';

                    dialog = $compile(angular.element(alertTmpl))(data);

                    $document.find("body").append(dialog);
                    dialog.css("display", "block");
                    dialog.css("z-index", zIndex + dialogCounter);

                    dialogDrag()(dialog);

                    return defer.promise;
                },
                confirm: function (param) {
                    var defer = $q.defer();

                    var dialog;
                    dialogCounter++;

                    // if (dialogCounter == 1) {
                    //   $document.find("body").append(mask);
                    // }

                    var data = $rootScope.$new();
                    angular.extend(data, param);

                    data.ok = function () {
                        service.dismiss(dialog);
                        defer.resolve("ok");
                    };
                    data.cancel = function () {
                        service.dismiss(dialog);
                        defer.reject("cancel");
                    };
                    data.close = function () {
                        service.dismiss(dialog);
                        defer.reject("cancel");
                    };

                    dialog = $compile(confirmTmpl)(data);

                    $document.find("body").append(dialog);
                    dialog.css("display", "block");
                    dialog.css("z-index", zIndex + dialogCounter);

                    dialogDrag()(dialog);

                    return defer.promise;
                },
                dismiss: function (dialog) {
                    dialogCounter--;
                    dialog.remove();

                    if (dialogCounter == 0) {
                        // mask.remove();
                    }
                }
            };

            return service;
        }]);
}