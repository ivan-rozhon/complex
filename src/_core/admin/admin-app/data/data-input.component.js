(function () {
    'use strict';

    angular.module('data.dataInputComponent', [
        'data.dataInputModelDirective'
    ])
        .component('npcDataInput', {
            templateUrl: 'data/data-input.component.html',
            controller: DataInputController,
            bindings: {
                index: '<index',
                lastIndex: '<lastIndex',
                key: '<key',
                data: '=data',
                config: '<config',
                addItem: '&addItem',
                deleteItem: '&deleteItem',
                moveItem: '&moveItem'
            }
        });

    DataInputController.$inject = [];
    function DataInputController() {
        var $ctrl = this;

        // Do add data item action
        $ctrl.doAddItem = function () {
            $ctrl.addItem({ key: $ctrl.key, index: $ctrl.index });
        };

        // Add new data item
        $ctrl.addDataItem = function (key, index) {
            // make copy of new item data prototype
            $ctrl.newDataItem = angular.copy($ctrl.config[key].add);

            // add new data item
            $ctrl.data[key].splice(index + 1, 0, $ctrl.newDataItem);
        };

        // Do delete
        $ctrl.doDeleteItem = function () {
            $ctrl.deleteItem({ key: $ctrl.key, index: $ctrl.index });
        };

        // Delete data item
        $ctrl.deleteDataItem = function (key, index) {
            $ctrl.data[key].splice(index, 1);
        };

        // Add new data group
        $ctrl.addGroup = function (key) {
            $ctrl.addDataItem(key, -1);
        };

        // Do move up/down action
        $ctrl.doMoveItem = function (direction) {
            $ctrl.moveItem({ direction: direction, key: $ctrl.key, index: $ctrl.index });
        };

        // Move item
        $ctrl.moveDataItem = function (direction, key, index) {
            // set new index of item
            var newIndex = direction ? index - 1 : index + 1;

            // move item to new positon (newIndex)
            $ctrl.data[key].move(index, newIndex);
        };
    }
})();