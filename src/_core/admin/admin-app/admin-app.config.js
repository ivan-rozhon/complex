(function () {
    'use strict';

    angular.module('adminApp.adminAppConfig', [])
        .config(function ($routeProvider, $locationProvider) {

            // routing config
            $routeProvider
                .when('/schema', {
                    title: 'Web schema',
                    template: '<npc-schema></npc-schema>'
                })
                .otherwise('/');
        });
})();