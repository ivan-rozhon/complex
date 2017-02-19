(function () {
    'use strict';

    angular.module('adminApp.adminAppConfig', [])
        .config(function ($routeProvider, $locationProvider) {

            // routing config
            $routeProvider
                .when('/config', {
                    title: 'Web config',
                    template: '<npc-config></npc-config>'
                })
                .when('/schema', {
                    title: 'Web schema',
                    template: '<npc-schema></npc-schema>'
                })
                .otherwise('/');
        });
})();