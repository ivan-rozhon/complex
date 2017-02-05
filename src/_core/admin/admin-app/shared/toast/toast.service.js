(function () {
    "use strict";

    angular
        .module('shared.toastService', [])
        .service('toastService', ToastService);

    ToastService.$inject = ['$mdToast'];
    function ToastService($mdToast) {
        var $ctrl = this;

        // show simple success/error toast
        $ctrl.simpleToast = function (success) {
            $mdToast.show(
                $mdToast.simple()
                    .toastClass(success ? 'toast-success' : 'toast-error')
                    .textContent(success ? 'Success!' : 'Error!')
                    .position('bottom right')
                    .hideDelay(3000)
            );
        };
    }
})();