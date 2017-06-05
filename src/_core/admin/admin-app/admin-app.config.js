(function () {
    'use strict';

    angular.module('adminApp.adminAppConfig', [])
        .config(function ($routeProvider, $locationProvider) {

            // hash prefix config
            $locationProvider.hashPrefix('');

            // routing config
            $routeProvider
                .when('/config', {
                    title: 'Web config',
                    template: '<npc-config></npc-config>'
                })
                .when('/structure', {
                    title: 'Web structure',
                    template: '<npc-schema></npc-schema>'
                })
                .otherwise('/');
        });
})();