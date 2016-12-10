(function () {
    "use strict";

    angular
        .module('authorization.authorizationUserService', [])
        .service('authorizationUserService', AuthorizationUserService);

    AuthorizationUserService.$inject = ['$http', 'API'];
    function AuthorizationUserService($http, API) {
        var $ctrl = this;
        
        $ctrl.login = function (username, password) {
            return $http.post(API + 'login', {
                username: username,
                password: password
            })
        };
    }
})();