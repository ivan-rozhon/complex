(function () {
    'use strict';

    angular.module('auth.authComponent', [
        'auth.authService',
        'auth.authUserService'
    ])
        .component('npcAuth', {
            templateUrl: 'shared/auth/auth.component.html',
            controller: AuthController,
            bindings: {}
        });

    AuthController.$inject = ['authService', 'authUserService', '$window'];
    function AuthController(authService, authUserService, $window) {
        var $ctrl = this;

        function handleRequest(res) {
            console.log(res);
            var token = res.data ? res.data.token : null;
            if (token) { console.log('JWT:', token);}
            $ctrl.message = res.data.message;
        }

        $ctrl.login = function () {
            authUserService.login($window.btoa($ctrl.username), $window.btoa($ctrl.password))
                .then(handleRequest, handleRequest);
        };

        $ctrl.logout = function () {
            authService.logout();
        };

        $ctrl.isAuthed = function () {
            return authService.isAuthed ? authService.isAuthed() : false;
        };
    }
})();