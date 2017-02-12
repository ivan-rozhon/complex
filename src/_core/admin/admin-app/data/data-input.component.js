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
                addItem: '&addItem'
            }
        });

    DataInputController.$inject = [];
    function DataInputController() {
        var $ctrl = this;

        // Do add schema item action
        $ctrl.doAddItem = function () {
            $ctrl.addItem({ key: $ctrl.key, index: $ctrl.index });
        };

        // Add new data item
        $ctrl.addDataItem = function (key, index) {
            console.log(arguments);
        };
    }
})();