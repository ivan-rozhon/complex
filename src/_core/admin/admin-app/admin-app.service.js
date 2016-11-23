(function () {
    "use strict";

    angular
        .module('adminApp.adminAppService', [])
        .service('adminAppService', AdminAppService);

    AdminAppService.$inject = [];
    function AdminAppService() {
        var $ctrl = this;

        $ctrl.dataFromService = 'data from service';

        $ctrl.getDataFromService = function () {
            return $ctrl.dataFromService;
        };
    }
})();