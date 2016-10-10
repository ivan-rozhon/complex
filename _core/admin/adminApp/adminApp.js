(function (angular) {
    'use strict';
    function AdminAppController($http) {
        var ctrl = this;

        ctrl.title = 'Admin App';

        ctrl.getWebSchema = function () {
            $http({
                method: "GET",
                url: "http://127.0.0.1/edsa-php_cms_nosql/_source/web-schema.json"
            }).then(function mySucces(response) {
                ctrl.title = response.data;
            }, function myError(response) {
                ctrl.title = response.statusText;
            });
        };
    }

    angular.module('adminApp').component('adminApp', {
        templateUrl: '_core/admin/adminApp/adminApp.html',
        controller: AdminAppController
    });
})(window.angular);