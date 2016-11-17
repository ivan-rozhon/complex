(function () {
    'use strict';

    angular.module('adminApp.adminAppSchemaComponent', [
        'adminApp.adminAppSchemaItemComponent'
        ])
        .component('adminAppSchema', {
            templateUrl: 'admin-app-schema.component.html',
            controller: AdminAppSchemaController,
            bindings: {
                schema: '<'
            }
        });

    function AdminAppSchemaController() {
        var $ctrl = this;

        $ctrl.schemaType = function (schema) {
            return typeof schema;
        }
    }
})();