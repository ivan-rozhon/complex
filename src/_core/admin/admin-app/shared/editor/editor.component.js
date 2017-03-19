(function () {
    'use strict';

    angular.module('shared.editorComponent', [])
        .component('npcEditor', {
            templateUrl: 'shared/editor/editor.component.html',
            controller: EditorController,
            bindings: {

            }
        });

    EditorController.$inject = ['$mdDialog', '$timeout'];
    function EditorController($mdDialog, $timeout) {
        let $ctrl = this;

        // Current selected text attributes
        $ctrl.currentAttributes = {};
        // Titles (headings)
        $ctrl.titles = [1, 2, 3, 4, 5, 6];

        // DEBUG
        $ctrl.trix = '<div><!--block--><a href="http://sachinchoolur.github.io/angular-trix/">trix editor</a><br><br></div><pre><!--block-->&lt;code awesome="true"&gt;&lt;/code&gt;</pre><div><!--block--><br></div><blockquote><!--block-->Quoted <em>text italic<br></em>and<strong> bold</strong></blockquote><ul><li><h3><!--block-->T3</h3><ul><li><!--block-->2nd level <u>bullet</u></li></ul></li></ul><div><!--block--><del>strikethrough text</del></div>';
        $ctrl.colors = ['F44336', '3F51B5', 'CDDC39', '4CAF50', 'FFC107', '795548'];

        // Define "underline" format
        Trix.config.textAttributes.underline = { tagName: 'u' };

        // Define title`s formats
        angular.forEach($ctrl.titles, function (value, key) {
            Trix.config.blockAttributes[`title${value}`] = {
                tagName: 'h' + value, breakOnReturn: true, group: false
            };
        });

        // Define colors formats
        angular.forEach($ctrl.colors, function (value, key) {
            Trix.config.textAttributes[`color${value}`] = { style: { 'color': '#' + value }, nestable: false };
        });

        console.log(Trix.config);

        // trix-initialize (trix initialization)
        // @e trix event
        // @editor Trix.Editor instance
        $ctrl.trixInitialize = function (e, editor) {
            // After event post processing
            $ctrl.afterEvent(e, editor);
        };

        // trix-change (text format changed)
        $ctrl.trixChange = function (e, editor) {
            // After event post processing
            $ctrl.afterEvent(e, editor);
        };

        // trix-selection-change
        $ctrl.trixSelectionChange = function (e, editor) {
            // After event post processing
            $ctrl.afterEvent(e, editor);
        };

        // trix-focus (if <trix-editor> is focused)
        $ctrl.trixFocus = function (e, editor) {
            // add 'active' class
            editor.element.classList.add('active');

            // After event post processing
            $ctrl.afterEvent(e, editor);
        };

        // trix-blur (if <trix-editor> is blured)
        $ctrl.trixBlur = function (e, editor) {
            // remove 'active' class
            editor.element.classList.remove('active');

            // After event post processing
            $ctrl.afterEvent(e, editor);
        };

        // After event (user interact) actions
        $ctrl.afterEvent = function (e, editor) {
            // timeout fix
            $timeout(function () {
                // save current selected text attributes
                $ctrl.currentAttributes = angular.copy(editor.composition.currentAttributes);
            }, 200);
        };

        // Editor attribute active flag check
        $ctrl.isAttrActive = function (attrName, arrayName) {
            let state = false;

            // iterate over defined attributes
            for (let i of $ctrl[arrayName]) {
                state = $ctrl.currentAttributes[`${attrName}${i}`] ? true : state;
            }

            return state;
        };
    }
})();