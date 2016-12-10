(function (angular) {
    'use strict';
    angular.module('adminApp', [
        'ngMaterial',
        'ngSanitize',
        'adminApp.templates',
        'adminApp.shared',
        'adminApp.authorization',
        'adminApp.adminAppComponent',
        'adminApp.schema'
    ]);
})(window.angular);