(function (angular) {
    'use strict';
    angular.module('adminApp', [
        'ngMaterial',
        'ngSanitize',
        'ngRoute',
        'adminApp.templates',
        'adminApp.shared',
        'adminApp.adminAppComponent',
        'adminApp.schema'
    ]);
})(window.angular);