(function () {
    'use strict';

    angular.module('schema.schemaComponent', [
        'schema.schemaInputComponent',
    ])
        .component('npcSchema', {
            templateUrl: 'schema/schema.component.html',
            controller: SchemaController,
            bindings: {
                key: '=schemaKey',
                schema: '=schemaValue',
                schemaConfig: '<'
            }
        });

    function SchemaController() {
        var $ctrl = this;
    }
})();