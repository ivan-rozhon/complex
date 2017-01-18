(function () {
    'use strict';

    angular.module('schema.schemaInputComponent', [
        'schema.schemaInputModelDirective'
    ])
        .component('npcSchemaInput', {
            templateUrl: 'schema/schema-input.component.html',
            controller: SchemaInputController,
            bindings: {
                schema: '=schemaValue',
                schemaKey: '<?',
                schemaMainKey: '<?',
                schemaName: '<',
                schemaConfig: '<',
                deepLevel: '<',
                addItem: '&addItem'
            }
        });

    function SchemaInputController() {
        var $ctrl = this;

        $ctrl.inputType = function (key) {
            return $ctrl.schemaConfig.data[key].type;
        };

        $ctrl.inputData = function (key) {
            return $ctrl.schemaConfig.data[key];
        };

        // Do add schema item action
        $ctrl.doAddItem = function () {
            $ctrl.addItem({ deepLevel: $ctrl.deepLevel, id: $ctrl.schema.id, key: $ctrl.schemaMainKey });
        };

        // Add new schema item
        $ctrl.addSchemaItem = function (deepLevel, id, key) {
            console.log(deepLevel);
            console.log(id);
            console.log(key);
        };
    }
})();