(function () {
    "use strict";

    angular
        .module('authorization.authorizationFactory', [])
        .factory('authorizationFactory', AuthorizationFactory);

    AuthorizationFactory.$inject = ['API', 'authorizationService'];
    function AuthorizationFactory(API, authorizationService) {
        var $ctrl = this;

        return {
            // automatically attach Authorization header
            request: function (config) {
                var token = authorizationService.getToken();
                if (config.url.indexOf(API) === 0 && token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },

            // If a token was sent back, save it
            response: function (res) {
                if (res.config.url.indexOf(API) === 0 && res.data.token) {
                    authorizationService.saveToken(res.data.token);
                }

                return res;
            }
        }
    }
})();