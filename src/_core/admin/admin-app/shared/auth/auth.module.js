(function (angular) {
    'use strict';
    angular.module('shared.auth', [
        'auth.authFactory',
        'auth.authConstants',
        'auth.authConfig',
        'auth.authComponent'
    ]);
})(window.angular);