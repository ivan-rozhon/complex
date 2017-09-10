(function () {
    "use strict";

    angular
        .module('auth.authUserService', [])
        .service('authUserService', AuthUserService);

    AuthUserService.$inject = ['$http', 'API'];
    function AuthUserService($http, API) {
        var $ctrl = this;

        // create full API URL
        $ctrl.apiURL = `${location.protocol}//${location.host}${location.pathname}${API}`;

        // User login POST request
        $ctrl.login = function (username, password) {
            return $http.post($ctrl.apiURL + 'login', {
                username: username,
                password: password
            });
        };

        // Load web schema GET request
        $ctrl.loadSchema = function () {
            return $http.get($ctrl.apiURL + 'schemaLoad');
        };

        // Submit web schema POST request
        $ctrl.submitSchema = function (schema) {
            return $http.post($ctrl.apiURL + 'schemaSave', {
                schema: schema
            });
        };

        // Update data model (according to template change)
        $ctrl.updateDataModel = function (data, template, key) {
            return $http.post($ctrl.apiURL + 'dataUpdate', {
                data: data,
                template: template,
                key: key
            });
        };

        // Create new data model & return dataKey
        $ctrl.createDataModel = function (template) {
            return $http.post($ctrl.apiURL + 'dataNew', {
                template: template
            });
        };

        // Return data by dataKey
        $ctrl.loadDataModel = function (dataKey, template) {
            return $http.get($ctrl.apiURL + 'dataLoad', {
                headers: {
                    data: dataKey,
                    template: template
                }
            });
        };

        // Save data by dataKey
        $ctrl.saveDataModel = function (dataKey, data) {
            return $http.post($ctrl.apiURL + 'dataSave', {
                key: dataKey,
                data: data
            });
        };
    }
})();