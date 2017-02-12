(function () {
    "use strict";

    angular
        .module('auth.authUserService', [])
        .service('authUserService', AuthUserService);

    AuthUserService.$inject = ['$http', 'API'];
    function AuthUserService($http, API) {
        var $ctrl = this;

        // User login POST request
        $ctrl.login = function (username, password) {
            return $http.post(API + 'login', {
                username: username,
                password: password
            });
        };

        // Load web schema GET request
        $ctrl.loadSchema = function () {
            return $http.get(API + 'schemaLoad');
        };

        // Submit web schema POST request
        $ctrl.submitSchema = function (schema) {
            return $http.post(API + 'schemaSave', {
                schema: schema
            });
        };

        // Update data model (according to template change)
        $ctrl.updateDataModel = function (data, template, key) {
            return $http.post(API + 'dataUpdate', {
                data: data,
                template: template,
                key: key
            });
        };

        // Create new data model & return dataKey
        $ctrl.createDataModel = function (template) {
            return $http.post(API + 'dataNew', {
                template: template
            });
        };

        // Return data by dataKey
        $ctrl.loadDataModel = function (dataKey, template) {
            return $http.get(API + 'dataLoad', {
                headers: {
                    data: dataKey,
                    template: template
                }
            });
        };

        // Save data by dataKey
        $ctrl.saveDataModel = function (dataKey, data) {
            return $http.post(API + 'dataSave', {
                key: dataKey,
                data: data
            });
        };
    }
})();