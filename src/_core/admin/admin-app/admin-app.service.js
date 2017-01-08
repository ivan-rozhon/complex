(function () {
    "use strict";

    angular
        .module('adminApp.adminAppService', [])
        .service('adminAppService', AdminAppService);

    AdminAppService.$inject = ['$q', '$http'];
    function AdminAppService($q, $http) {
        var $ctrl = this;
    }
})();