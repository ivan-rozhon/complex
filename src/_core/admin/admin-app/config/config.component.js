(function () {
    'use strict';

    angular.module('config.configComponent', [])
        .component('npcConfig', {
            templateUrl: 'config/config.component.html',
            controller: ConfigController
        });

    ConfigController.$inject = [];
    function ConfigController() {
        let $ctrl = this;
    }
})();