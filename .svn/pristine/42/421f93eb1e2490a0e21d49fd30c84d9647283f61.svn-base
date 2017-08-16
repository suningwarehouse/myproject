

export default app => {
    app.directive("ueditor", ["LazyLoader", "$timeout", function (LazyLoader, $timeout) {
        return {
            restrict: "A",
            require: 'ngModel',
            scope: {
                content: "=ngModel"
            },
            link: function (scope, element, attrs, ctrl) {
                var ue;
                LazyLoader.loadQueue(["component/ueditor/ueditor/ueditor/ueditor.parse.js", "component/ueditor/ueditor/ueditor/ueditor.config.js", "component/ueditor/ueditor/ueditor/ueditor.all.min.js", "component/ueditor/ueditor/ueditor/lang/zh-cn/zh-cn.js"])
                    .then(function () {
                        ue = UE.getEditor(element[0].id,attrs.option?JSON.parse(attrs.option):'');
                        var lastContent = scope.content;

                        ue.ready(function () {
                            if (scope.content) {
                                ue.setContent(scope.content);
                            }
                            scope.$emit('ueditorLoaded',{ueditor:ue});
                            scope.$watch("content", function (newVal) {
                                if (newVal && newVal != lastContent) {
                                    ue.setContent(newVal);
                                }
                            });

                            ue.addListener("contentChange", function (editor) {
                                lastContent = scope.content = ue.getContent();

                                //-------add 2017/2/16-----
                                ctrl.$dirty = true;
                                ctrl.$pristine = false;
                                //-----------------


                                $timeout(function () {
                                    scope.$apply();
                                }, 0);
                            });

                            //-------add 2017/2/16------
                            ue.addListener("blur focus", function(type) {
                                if (type == 'blur') {
                                    scope.$apply(function() {
                                        ctrl.$snFocused = false;
                                    });
                                } else if (type == 'focus') {
                                    scope.$apply(function() {
                                        ctrl.$snFocused = true;
                                    });
                                }
                            })
                        });
                    });

                scope.$on("$destroy", function () {
                    console.log("ueditor destroy:" + element[0].id);

                    if (ue) {
                        try {
                            ue.destroy();
                        } catch (ex) {
                        }
                    }
                });
            }
        };
    }]);
}