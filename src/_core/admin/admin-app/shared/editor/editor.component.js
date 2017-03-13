(function () {
    'use strict';

    angular.module('shared.editorComponent', [])
        .component('npcEditor', {
            templateUrl: 'shared/editor/editor.component.html',
            controller: EditorController
        });

    EditorController.$inject = [];
    function EditorController() {
        let $ctrl = this;

        // display: block;
        // position: absolute;
        // margin - top: 8px;
        // background - color: rgb(224, 224, 224);
        // padding: 16px 8px;

        $ctrl.trix = '<div><!--block--><a href="http://sachinchoolur.github.io/angular-trix/">hello</a></div><ul><li><!--block-->lol<ul><li><!--block-->bum</li></ul></li></ul><div><!--block--><del>hey</del></div>';

        // init trix variables
        // $ctrl.trixEditorActive = false;

        // Define "underline"" format
        Trix.config.textAttributes.underline = {
            tagName: 'u',
            inheritable: true
        };

        $ctrl.underline = function () {
            $ctrl.editor.setSelectedRange([3, 5]);
            $ctrl.editor.deactivateAttribute("underline");
        };

        console.log(Trix.config);

        // Trix.config.textAttributes.heading = { inheritable: true, tagName: 'h1' };
        // Trix.config.textAttributes.subHeading = { inheritable: true, tagName: 'h2' };

        // trix-initialize (trix initialization)
        // @e trix event
        // @editor Trix.Editor instance
        $ctrl.trixInitialize = function (e, editor) {
            // editor.insertString("Hello");
            // editor.setSelectedRange([0, 5]);
            // editor.activateAttribute("underline");
            // $ctrl.editor = editor;
        };

        // trix-change (text format changed)
        $ctrl.trixChange = function (e, editor) {
            // console.log(arguments);
        };

        // trix-selection-change
        $ctrl.trixSelectionChange = function (e, editor) {
            // console.log(arguments);
        };

        // trix-focus (if <trix-editor> is focused)
        $ctrl.trixFocus = function (e, editor) {
            // add 'active' class
            editor.element.classList.add('active');
        };

        // trix-blur (if <trix-editor> is blured)
        $ctrl.trixBlur = function (e, editor) {
            // remove 'active' class
            editor.element.classList.remove('active');
        };
    }
})();