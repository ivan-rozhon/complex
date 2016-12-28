(function () {
    "use strict";

    angular
        .module('schema.schemaService', [])
        .service('schemaService', SchemaService);

    SchemaService.$inject = ['$q', '$http'];
    function SchemaService($q, $http) {
        var $ctrl = this;

        $ctrl.loadSchema = function () {
            
        };
    }
})();