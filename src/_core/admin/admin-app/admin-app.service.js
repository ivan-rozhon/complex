(function () {
    "use strict";

    angular
        .module('adminApp.adminAppService', [])
        .service('adminAppService', AdminAppService);

    AdminAppService.$inject = ['$q', '$http'];
    function AdminAppService($q, $http) {
        var $ctrl = this;

        $ctrl.dataFromService = 'data from service';

        $ctrl.getDataFromService = function () {
            // return $ctrl.dataFromService;
            return $q(function (resolve, reject) {
                // setTimeout(function () {
                //     if ($ctrl.dataFromService) {
                //         resolve($ctrl.dataFromService);
                //     } else {
                //         reject('error');
                //     }
                // }, 1000);
                $http({
                    method: "GET",
                    url: "?api/",
                    params: { file: 'web-schema', folder: 'data' }
                }).then(function (response) {
                    $ctrl.status = response.status;
                    $ctrl.data = response.data;
                    if ($ctrl.data) {
                        resolve($ctrl.data);
                    } else {
                        reject('error');
                    }
                });
            });
        };
    }
})();