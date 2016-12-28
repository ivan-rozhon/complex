(function () {
    "use strict";

    angular
        .module('auth.authUserService', [])
        .service('authUserService', AuthUserService);

    AuthUserService.$inject = ['$http', 'API'];
    function AuthUserService($http, API) {
        var $ctrl = this;
        
        $ctrl.login = function (username, password) {
            return $http.post(API + 'login', {
                username: username,
                password: password
            });
        };

        $ctrl.loadSchema = function () {
            return $http.get(API + 'schema');
        };
    }
})();