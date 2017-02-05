(function () {
    "use strict";

    angular
        .module('data.dataService', [])
        .service('dataService', DataService);

    DataService.$inject = ['$q', 'authUserService'];
    function DataService($q, authUserService) {
        var $ctrl = this;

        // services
        $ctrl.authUserService = authUserService;

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
                res.data : res.data.data && res.data.config ?
                    // return data & config if exists
                    { data: JSON.parse(res.data.data), config: JSON.parse(res.data.config) } : null;
        };
    }
})();