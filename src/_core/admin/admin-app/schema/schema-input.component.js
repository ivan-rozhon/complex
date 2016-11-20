(function () {
    'use strict';

    angular.module('schema.schemaInputComponent', [

    ])
        .component('npcSchemaInput', {
            templateUrl: 'schema/schema-input.component.html',
            controller: SchemaInputController,
            bindings: {
                schema: '<npcSchema'
            }
        });

    function SchemaInputController() {
        var $ctrl = this;
    }
})();