(function () {
    'use strict';

    angular.module('adminApp.adminAppSchemaItemComponent', [])
        .component('adminAppSchemaItem', {
            controller: AdminAppSchemaController,
            bindings: {
                schema: '<',
                schemaType: '<'
            },
            template: function () {
                console.log();
                return '<p>{{ $ctrl.schema }}</p>';
            }
        });

    function AdminAppSchemaController() {
        var $ctrl = this;
        
        // console.log(typeof $ctrl.schema);
        console.log($ctrl.schemaType);
    }
})();