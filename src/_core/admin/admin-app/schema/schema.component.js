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

    SchemaController.$inject = ['$http', 'API', 'authUserService'];
    function SchemaController($http, API, authUserService) {
        var $ctrl = this;

        function handleRequest(res) {
            console.log(res);
            $ctrl.data = res.data ? JSON.parse(res.data.schema) : null;

            var token = res.data ? res.data.token : null;
            if (token) { console.log('JWT:', token);}
        }

        $ctrl.loadSchema = function () {
            delete $ctrl.data;
            authUserService.loadSchema()
                .then(handleRequest, handleRequest);
        };

    }
})();