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

        $ctrl.authService = authService;

        $ctrl.toogleLeftMenu = function () {
            $mdSidenav('left').toggle();
        };       

        $ctrl.logout = function () {
            authService.logout && authService.logout()
        };

        $ctrl.goTo = function (value) {
            $location.path(value);
            $ctrl.toogleLeftMenu();
        };

        $ctrl.$onInit = function () {
            // $ctrl.data = adminAppService.getDataFromService().then(function (data) {
            //     console.log(data);
            // }, function (reason) {
            //     console.log('Failed: ' + reason);
            // });
        };

        $ctrl.status = null;
        $ctrl.data = {};

        $ctrl.file = 'web-schema';
        $ctrl.folder = 'data';

        $ctrl.camelCase = function (kebabCase) {
            // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
            return kebabCase.replace(
                /-([a-z])/g,
                function (g) {
                    return g[1].toUpperCase();
                }).replace('-', '');
        };

        $ctrl.getJson = function () {
            $ctrl.data = {};
            $http({
                method: "GET",
                url: "?api/",
                params: { file: $ctrl.file, folder: $ctrl.folder }
            }).then(function (response) {
                $ctrl.status = response.status;
                $ctrl.data = response.data;
            });
        };

        $ctrl.postJson = function () {
            var json = JSON.stringify($ctrl.data);
            // console.log(json);
            $http({
                method: "POST",
                url: "?api/",
                data: { 'json': json }
            }).then(function (response) {
                console.log(response.status);
                console.log(response.data);
            });
        };
    }
})();