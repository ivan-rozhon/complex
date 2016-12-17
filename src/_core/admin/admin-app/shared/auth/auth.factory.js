(function () {
    "use strict";

    angular
        .module('auth.authFactory', [])
        .factory('authFactory', AuthFactory);

    AuthFactory.$inject = ['API', 'authService'];
    function AuthFactory(API, authService) {
        var $ctrl = this;

        return {
            // automatically attach Authorization header
            request: function (config) {
                var token = authService.getToken();
                if (config.url.indexOf(API) === 0 && token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },

            // If a token was sent back, save it
            response: function (res) {
                if (res.config.url.indexOf(API) === 0 && res.data.token) {
                    authService.saveToken(res.data.token);
                }

                return res;
            }
        }
    }
})();