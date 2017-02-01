(function () {
    "use strict";

    angular
        .module('data.dataService', [])
        .service('dataService', DataService);

    DataService.$inject = ['$q', 'authUserService'];
    function DataService($q, authUserService) {
        var $ctrl = this;
    }
})();