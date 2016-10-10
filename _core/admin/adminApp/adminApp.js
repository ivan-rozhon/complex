(function (angular) {
    'use strict';
    function AdminAppController($http) {
        var ctrl = this;

        ctrl.data = {};

        ctrl.getJson = function () {
            $http({
                method: "GET",
                url: "http://127.0.0.1/edsa-php_cms_nosql/?api"
            }).then(function (response) {
                ctrl.data = response.data;
            });
        };
    }

    angular.module('adminApp').component('adminApp', {
        templateUrl: '_core/admin/adminApp/adminApp.html',
        controller: AdminAppController
    });
})(window.angular);