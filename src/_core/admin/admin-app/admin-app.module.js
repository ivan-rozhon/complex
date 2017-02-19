(function (angular) {
    'use strict';
    angular.module('adminApp', [
        'ngMaterial',
        'ngSanitize',
        'ngRoute',
        'angularTrix',
        'adminApp.templates',
        'adminApp.shared',
        'adminApp.adminAppComponent',
        'adminApp.config',
        'adminApp.schema',
        'adminApp.data'
    ]);
})(window.angular);