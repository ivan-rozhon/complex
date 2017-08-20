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
            // make copy of new item data prototype
            $ctrl.newDataItem = angular.copy($ctrl.config[key].add);

            // add new data item
            $ctrl.data[key].splice(index + 1, 0, $ctrl.newDataItem);
        };

        // Delete data item
        $ctrl.deleteDataItem = function (key, index) {
            $ctrl.data[key].splice(index, 1);
        };

        // Add new data group
        $ctrl.addGroup = function (key) {
            $ctrl.addDataItem(key, -1);
        };

        // Move item
        $ctrl.moveDataItem = function (direction, key, index) {
            // set new index of item
            var newIndex = direction ? index - 1 : index + 1;

            // move item to new positon (newIndex)
            $ctrl.data[key].move(index, newIndex);
        };

        // open 'Add generic' menu
        $ctrl.openGenericMenu = function ($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        // add generic item
        $ctrl.addGeneric = function (container, item, index = 0) {
            // make copy of new item value
            let newGenericItemValue = angular.copy($ctrl.config[container].aviable[item]);

            // new item has specific position
            $ctrl.data[container].splice(index + 1, 0, { [item]: newGenericItemValue });
        };
    }
})();