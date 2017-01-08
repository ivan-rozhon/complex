(function () {
    'use strict';

    angular.module('adminApp.adminAppConfig', [])
        .config(function ($routeProvider, $locationProvider) {

            // routing config
            $routeProvider
                .when('/schema', {
                    template: '<npc-schema></npc-schema>'
                })
                .otherwise('/');
        });
})();