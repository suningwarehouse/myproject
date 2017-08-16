import {
    Inject
} from 'business/decorator/decorator';

@Inject
class navheadDetail {
    constructor($scope, $state, $rootScope) {
        let vm = $scope;
        vm.title = '';
        vm.description = '';
       
        vm.title = $state.current.data.title
        vm.description = $state.current.data.description
        let toStateCache
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            toStateCache = toState
        })
        $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
            if (toStateCache) {
                vm.title = toStateCache.data && toStateCache.data.title
                vm.description = toStateCache.data && toStateCache.data.description
            }
        })
    }
}

export default app => app.controller('navheadDetail', navheadDetail);