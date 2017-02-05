(function () {
    "use strict";

    angular
        .module('auth.authService', [])
        .service('authService', AuthService);

    AuthService.$inject = ['$window'];
    function AuthService($window) {
        var $ctrl = this,
            // set token name in localStorage
            tokenName = 'npc-auth-token';

        // Add JWT methods here
        $ctrl.parseJwt = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };

        $ctrl.saveToken = function (token) {
            $window.localStorage[tokenName] = token;
        };

        $ctrl.getToken = function () {
            return $window.localStorage[tokenName];
        };

        $ctrl.isAuthed = function () {
            var token = $ctrl.getToken();
            if (token) {
                var params = $ctrl.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        $ctrl.logout = function () {
            $window.localStorage.removeItem(tokenName);
        };
    }
})();