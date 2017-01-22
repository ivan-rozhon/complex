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

        // initial deep level
        $ctrl.deepLevel = 0;

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

        // Submit web schema
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

        // Add new schema item
        $ctrl.addSchemaItem = function (deepLevel, key, index) {
            // make copy of new item schema prototype
            $ctrl.newSchemaItem = angular.copy($ctrl.schema._metadata.schemes[key].add[deepLevel]);

            // add new schema item
            $ctrl.schema.webSchema[key].splice(index + 1, 0, $ctrl.newSchemaItem);
        };

        // Delete schema item
        $ctrl.deleteSchemaItem = function (key, index) {
            // delete schema item if schema has least at one item
            if ($ctrl.schema.webSchema[key].length > 1) {
                $ctrl.schema.webSchema[key].splice(index, 1);
            }
        };

        // Add new schema sub item
        $ctrl.addSchemaSubItem = function (deepLevel, key, index) {
            // make copy of new sub item schema prototype
            $ctrl.newSchemaSubItem = angular.copy($ctrl.schema._metadata.schemes[key].add[deepLevel + 1]);

            // add new schema sub item
            $ctrl.schema.webSchema[key][index].sub.push($ctrl.newSchemaSubItem);
        };

        // Move item
        $ctrl.moveSchemaItem = function (direction, key, index) {
            // set new index of item
            var newIndex = direction ? index - 1 : index + 1;

            // move item to new positon (newIndex)
            $ctrl.schema.webSchema[key].move(index, newIndex);
        };
    }
})();