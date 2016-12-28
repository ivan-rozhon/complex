(function () {
    'use strict';

    angular.module('adminApp.adminAppConfig', [])
        .config(function ($routeProvider, $locationProvider) {

            // $locationProvider.hashPrefix('');

            $routeProvider
                .when('/schema', {
                    template: '<npc-schema></npc-schema>'
                })
                .otherwise('/');
        });
})();