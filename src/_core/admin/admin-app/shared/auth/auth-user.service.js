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
            return $http.get(API + 'schema');
        };

        // Submit web schema POST request
        $ctrl.submitSchema = function (schema) {
            return $http.post(API + 'schema', {
                schema: schema
            });
        };
    }
})();