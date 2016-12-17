(function () {
    "use strict";

    angular
        .module('auth.authConfig', [])
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authFactory');
        });
})();