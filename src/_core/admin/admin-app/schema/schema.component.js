(function () {
    'use strict';

    angular.module('schema.schemaComponent', [
        'schema.schemaService',
        'schema.schemaInputComponent',
    ])
        .component('npcSchema', {
            templateUrl: 'schema/schema.component.html',
            controller: SchemaController
        });

    SchemaController.$inject = ['$http', 'API', 'authUserService', '$q'];
    function SchemaController($http, API, authUserService, $q) {
        var $ctrl = this;

        function handleRequest(res) {
            console.log(res);
            $ctrl.data = res.data.schema ? JSON.parse(res.data.schema) : null;

            var token = res.data.token ? res.data.token : null;
            if (token) { console.log('JWT:', token);}
        }

        $ctrl.loadSchema = function () {
            delete $ctrl.data;
            $q.when(authUserService.loadSchema())
                .then(handleRequest, handleRequest);
        };

    }
})();