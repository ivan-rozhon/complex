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
            $ctrl.$route = $route;
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

        // move() method
        // http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
        Array.prototype.move = function (old_index, new_index) {
            while (old_index < 0) {
                old_index += this.length;
            }
            while (new_index < 0) {
                new_index += this.length;
            }
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
        };
    }
})();