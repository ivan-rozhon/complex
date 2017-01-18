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

        // Add new schema item
        $ctrl.addSchemaItem = function (deepLevel, id, key) {
            // console.log(deepLevel);
            // console.log(schema);
            // console.log(key);

            console.log("add object:");
            console.log($ctrl.schema._metadata.schemes[key].add[deepLevel]);

            console.log("to schema:");
            console.log($ctrl.schema.webSchema[key]);

            console.log("to position:");
            var index = _.findIndex($ctrl.schema.webSchema[key], function(o) { return o.id == id; });
            console.log(index + 1);
        };
    }
})();