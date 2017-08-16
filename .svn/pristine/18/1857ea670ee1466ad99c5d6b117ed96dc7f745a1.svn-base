export default app => {
    app.directive('snColor', [function () {
    	return {
    		restrict: 'E',
    		template: '<span class="color-element" ng-repeat="item in list track by $index"></span>',
    		scope: {
    			sum: '=',
                ratio: '='
    		},
    		link: function(scope, elem, attrs) {
                let number = parseInt(scope.sum/scope.ratio);
				number>=7 && (number = 7);
                scope.list = Array.from({length: number}, x => 1);

    		}
    	}
    }]);
}