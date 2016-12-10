(function () {
    "use strict";

    angular
        .module('authorization.authorizationConfig', [])
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authorizationFactory');
        });
})();