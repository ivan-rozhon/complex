(function () {
    "use strict";

    angular
        .module('authorization.authorizationService', [])
        .service('authorizationService', AuthorizationService);

    AuthorizationService.$inject = ['$window'];
    function AuthorizationService($window) {
        var $ctrl = this;

        // Add JWT methods here
        $ctrl.parseJwt = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        $ctrl.saveToken = function (token) {
            $window.localStorage['jwtToken'] = token;
        }

        $ctrl.getToken = function () {
            return $window.localStorage['jwtToken'];
        }

        $ctrl.isAuthed = function () {
            var token = $ctrl.getToken();
            if (token) {
                var params = $ctrl.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }

        $ctrl.logout = function () {
            $window.localStorage.removeItem('jwtToken');
        }
    }
})();