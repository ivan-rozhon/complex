(function () {
    'use strict';

    angular.module('adminApp.adminAppComponent', [
        'adminApp.adminAppConfig',
        'adminApp.adminAppService'
    ])
        .component('adminApp', {
            templateUrl: 'admin-app.component.html',
            controller: AdminAppController
        });

    AdminAppController.$inject = ['$http', 'adminAppService', 'authService', '$mdSidenav', '$route', '$routeParams', '$location'];
    function AdminAppController($http, adminAppService, authService, $mdSidenav, $route, $routeParams, $location) {
        var $ctrl = this;

        // component initialization
        $ctrl.$onInit = function () {
            // services
            $ctrl.authService = authService;
            $ctrl.adminAppService = adminAppService;

        };

        // switch of the left navigation menu
        $ctrl.toogleLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        // navigation "on-click" action
        $ctrl.goTo = function (value) {
            $location.path(value);
            $ctrl.toogleLeftMenu();
        };

        // logout action
        $ctrl.logout = function () {
            $ctrl.authService.logout();
        };

        // kebab-case -> camelCase transformation
        $ctrl.camelCase = function (kebabCase) {
            // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
            return kebabCase.replace(
                /-([a-z])/g,
                function (g) {
                    return g[1].toUpperCase();
                }).replace('-', '');
        };
    }
})();