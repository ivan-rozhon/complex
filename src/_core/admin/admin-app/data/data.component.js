(function () {
    'use strict';

    angular.module('data.dataComponent', [
    ])
        .component('npcData', {
            templateUrl: 'data/data.component.html',
            controller: DataController,
            bindings: {
                data: '<',
                config: '<'
            }
        });

    DataController.$inject = ['$mdDialog'];
    function DataController($mdDialog) {
        var $ctrl = this;

        console.log($ctrl.data);
        console.log($ctrl.config);

        // Close dialog action
        $ctrl.closeDialog = function () {
            $mdDialog.hide();
        };
    }
})();