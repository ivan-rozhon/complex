(function () {
    'use strict';

    angular.module('schema.schemaComponent', [
        'schema.schemaInputComponent',
    ])
        .component('npcSchema', {
            templateUrl: 'schema/schema.component.html',
            controller: SchemaController,
            bindings: {
                schema: '=webSchema',
                schemaConfig: '<'
            }
        });

    function SchemaController() {
        var $ctrl = this;
    }
})();