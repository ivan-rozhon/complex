(function () {
    'use strict';

    angular.module('authorization.authorizationComponent', [
        'authorization.authorizationService',
        'authorization.authorizationUserService',
        'authorization.authorizationConstants',
        'authorization.authorizationConfig',
        'authorization.authorizationFactory'
    ])
        .component('npcAuthorization', {
            templateUrl: 'authorization/authorization.component.html',
            controller: AuthorizationController,
            bindings: {}
        });

    AuthorizationController.$inject = ['authorizationService', 'authorizationUserService'];
    function AuthorizationController(authorizationService, authorizationUserService) {
        var $ctrl = this;

        function handleRequest(res) {
            console.log(res);
            var token = res.data ? res.data.token : null;
            if (token) { 
                console.log('JWT:', token);
            } else {
                console.log('nothing happend');
            }

            $ctrl.message = res.data.message;
        }

        $ctrl.login = function () {
            authorizationUserService.login($ctrl.username, $ctrl.password)
                .then(handleRequest, handleRequest)
        }

        $ctrl.logout = function () {
            authorizationService.logout && authorizationService.logout()
        }
        
        $ctrl.isAuthed = function () {
            return authorizationService.isAuthed ? authorizationService.isAuthed() : false
        }
    }
})();