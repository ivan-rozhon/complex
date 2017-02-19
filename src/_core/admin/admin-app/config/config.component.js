(function () {
    'use strict';

    angular.module('config.configComponent', [])
        .component('npcConfig', {
            templateUrl: 'config/config.component.html',
            controller: ConfigController
        });

    ConfigController.$inject = [];
    function ConfigController() {
        var $ctrl = this;

        Trix.config.textAttributes.underline = {
            style: { "textDecoration": "underline" },
            inheritable: true,
            parser: function (element) {
                var style = window.getComputedStyle(element);
                return style.textDecoration === "underline";
            }
        };

        console.log(Trix.config);

        // Trix.config.textAttributes.heading = { inheritable: true, tagName: 'h1' };
        // Trix.config.textAttributes.subHeading = { inheritable: true, tagName: 'h2' };

        $ctrl.trixInitialize = function (e, editor) {
            editor.insertString("Hello");
            editor.setSelectedRange([0, 5]);
            editor.activateAttribute("underline");
            $ctrl.editor = editor;
        };

        $ctrl.trixChange = function (e, editor) {
            // console.log(arguments);
        };

        $ctrl.trixSelectionChange = function (e, editor) {
            console.log(arguments);
        };

        $ctrl.underline = function () {
            $ctrl.editor.setSelectedRange([3, 5]);
            $ctrl.editor.deactivateAttribute("underline");
        };
    }
})();