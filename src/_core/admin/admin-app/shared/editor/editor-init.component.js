(function () {
    'use strict';

    angular.module('shared.editorInitComponent', [])
        .component('npcEditorInit', {
            templateUrl: 'shared/editor/editor-init.component.html',
            controller: EditorInitController,
            bindings: {
                data: '<data',
                templateSrc: '<templateSrc',
                revealTemplate: '&revealTemplate'
            }
        });

    EditorInitController.$inject = ['$rootScope'];
    function EditorInitController($rootScope) {
        let $ctrl = this;

        $ctrl.disableEdit = false;

        // Do reveal (show) trix-editor
        $ctrl.doRevealTemplate = function () {
            $ctrl.revealTemplate();
        };

        // catch $broadcasted editorEvent
        $rootScope.$on('editorEvent', function (event, args) {
            $ctrl.disableEdit = args.disableEdit;
        });
    }
})();