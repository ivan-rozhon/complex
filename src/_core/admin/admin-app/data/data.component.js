(function () {
    'use strict';

    angular.module('data.dataComponent', [
        'data.dataService',
        'data.dataInputComponent'
    ])
        .component('npcData', {
            templateUrl: 'data/data.component.html',
            controller: DataController,
            bindings: {
                key: '<?',
                data: '<?',
                config: '<?',
                template: '<?',
                name: '<?'
            }
        });

    DataController.$inject = ['$mdDialog', 'dataService', 'toastService'];
    function DataController($mdDialog, dataService, toastService) {
        var $ctrl = this;

        // Close dialog action
        $ctrl.closeDialog = function () {
            // clear data before close
            delete $ctrl.data;
            delete $ctrl.config;

            $mdDialog.hide();
        };

        // (re)load data & config
        $ctrl.doLoadData = function () {
            // clear old data
            delete $ctrl.data;
            delete $ctrl.config;

            // load new
            dataService
                .loadData($ctrl.key, $ctrl.template)
                .then(function (result) {
                    if (result) {
                        // set new data & config
                        $ctrl.data = result.data;
                        $ctrl.config = result.config;
                    } else {
                        // error - show info toast
                        toastService.simpleToast(false);
                    }
                });
        };

        // save data model
        $ctrl.doSaveData = function () {
            dataService
                .saveData($ctrl.key, $ctrl.data)
                .then(function (result) {
                    if (result) {
                        // success - show info toast
                        toastService.simpleToast(true);
                    } else {
                        // error - show info toast
                        toastService.simpleToast(false);
                    }
                });
        };

        // Add new data item
        $ctrl.addDataItem = function (key, index) {
            console.log(arguments);
        };
    }
})();