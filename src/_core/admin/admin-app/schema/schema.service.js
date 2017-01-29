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

        // Save web schema
        $ctrl.postSchema = function (schema) {
            // submit schema -> send to BE
            return $q.when($ctrl.authUserService.submitSchema(schema))
                .then($ctrl.handleRequest, $ctrl.handleRequest);
        };

        // Update data model
        $ctrl.updateData = function (data, template, mainKey) {
            return $q.when($ctrl.authUserService.updateDataModel(data, template, mainKey))
                .then($ctrl.handleRequest, $ctrl.handleRequest);
        };

        // Create new data model
        $ctrl.createData = function (template) {
            return $q.when($ctrl.authUserService.createDataModel(template))
                .then($ctrl.handleRequest, $ctrl.handleRequest);
        };

        // Load data model
        $ctrl.loadData = function (dataKey, template) {
            return $q.when($ctrl.authUserService.loadDataModel(dataKey, template))
                .then($ctrl.handleRequest, $ctrl.handleRequest);
        };

        // Handle request
        $ctrl.handleRequest = function (res) {
            // log response
            console.log(res);

            // log token
            var token = res.data ? res.data.token : null;
            if (token) { console.log('JWT:', token); }

            // check if schema/data/success-message exists
            return res.data.success ?
                // return whole data object if true
                res.data : res.data.schema ?
                    // return schema if exists
                    JSON.parse(res.data.schema) : res.data.data && res.data.config ?
                        // return data & config if exists
                        { data: JSON.parse(res.data.data), config: JSON.parse(res.data.config) } : null;
        };
    }
})();