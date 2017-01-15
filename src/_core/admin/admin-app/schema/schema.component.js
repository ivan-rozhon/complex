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

    SchemaController.$inject = ['schemaService'];
    function SchemaController(schemaService) {
        var $ctrl = this;

        // component initialization
        $ctrl.$onInit = function () {
            // services
            $ctrl.schemaService = schemaService;
        };

        // Load web schema
        $ctrl.loadSchema = function () {
            // delete previous schema
            delete $ctrl.schema;

            // Call for schema
            $ctrl.schema = $ctrl.schemaService.getSchema().then(function (result) {
                $ctrl.schema = result;
            });
        };

        // Submin web schema
        $ctrl.submitSchema = function () {
            $ctrl.schemaService.postSchema($ctrl.schema).then(function (result) {
                // check result of submitting schema
                if (result) {
                    console.log('saved!');
                } else {
                    console.log('save failed!');
                }
            });
        };

        // Delete (discard) current loaded schema
        $ctrl.clearSchema = function () {
            delete $ctrl.schema;
        };
    }
})();