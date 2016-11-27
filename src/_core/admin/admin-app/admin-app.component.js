(function () {
    'use strict';

    angular.module('adminApp.adminAppComponent', [
        'adminApp.adminAppService'
    ])
        .component('adminApp', {
            templateUrl: 'admin-app.component.html',
            controller: AdminAppController
        });

    function AdminAppController($http, adminAppService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.data = adminAppService.getDataFromService();
            // console.log($ctrl.data); 
        };

        $ctrl.status = null;
        $ctrl.data = {};

        $ctrl.file = 'web-schema';
        $ctrl.folder = 'data';

        $ctrl.getSchema = function () {

        };

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