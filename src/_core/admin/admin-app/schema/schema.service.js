(function () {
    "use strict";

    angular
        .module('schema.schemaService', [])
        .service('schemaService', SchemaService);

    SchemaService.$inject = ['$q', 'authUserService'];
    function SchemaService($q, authUserService) {
        var $ctrl = this;

        // services
        $ctrl.authUserService = authUserService;

        // Load web schema
        $ctrl.getSchema = function () {
            // send request and wait for response
            return $q.when($ctrl.authUserService.loadSchema())
                .then($ctrl.handleRequest, $ctrl.handleRequest);
        };

        $ctrl.postSchema = function (schema) {
            // submit schema -> send to BE
            return $q.when($ctrl.authUserService.submitSchema(schema))
                .then($ctrl.handleRequest, $ctrl.handleRequest);
        };

        // Handle request
        $ctrl.handleRequest = function (res) {
            // log response
            console.log(res);

            // log token
            var token = res.data ? res.data.token : null;
            if (token) { console.log('JWT:', token);}

            // check if schema/message exists
            return res.data.schema ? JSON.parse(res.data.schema) : res.data.success ? res.data.success : null;
        };
    }
})();