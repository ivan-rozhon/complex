(function () {
    'use strict';

    angular.module('schema.schemaInputComponent', [
        'schema.schemaInputModelDirective'
    ])
        .component('npcSchemaInput', {
            templateUrl: 'schema/schema-input.component.html',
            controller: SchemaInputController,
            bindings: {
                schema: '=sectionSchema',
                schemaConfig: '<'
            }
        });

    function SchemaInputController() {
        var $ctrl = this;

        $ctrl.inputType = function (key) {
            // console.log(key);
            return $ctrl.schemaConfig['data'][key]['type'];
        };
    }
})();