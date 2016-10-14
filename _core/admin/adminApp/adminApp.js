(function (angular) {
    'use strict';
    function AdminAppController($http) {
        var ctrl = this;

        ctrl.status = null;
        ctrl.data = {};

        var param = 'lol'; 

        ctrl.getJson = function () {
            $http({
                method: "GET",
                url: "?api/",
                params: { param: param }
            }).then(function (response) {
                ctrl.status = response.status;
                ctrl.data = response.data;
            });
        };

        ctrl.postJson = function () {
            var json = JSON.stringify(ctrl.data);
            // console.log(json);
            $http({
                method: "POST",
                url: "?api/",
                data: { 'json' : json }
            }).then(function (response) {
                console.log(response.status);
                console.log(response.data);
            });
        };
    }

    angular.module('adminApp').component('adminApp', {
        templateUrl: '_core/admin/adminApp/adminApp.html',
        controller: AdminAppController
    });
})(window.angular);