(function () {
    'use strict';

    angular.module('data.dataInputComponent', [
        'data.dataInputModelDirective'
    ])
        .component('npcDataInput', {
            templateUrl: 'data/data-input.component.html',
            controller: DataInputController,
            bindings: {
                key: '<key',
                data: '=data',
                config: '<config'
            }
        });

    DataInputController.$inject = [];
    function DataInputController() {
        var $ctrl = this;
    }
})();