(function () {
    'use strict';

    angular.module('shared.editorComponent', [
        'shared.editorInitComponent'
    ])
        .component('npcEditor', {
            templateUrl: 'shared/editor/editor.component.html',
            controller: EditorController,
            bindings: {
                data: '=data',
                config: '<config'
            }
        });

    EditorController.$inject = ['$rootScope', '$scope', '$mdDialog', '$timeout', '$document'];
    function EditorController($rootScope, $scope, $mdDialog, $timeout, $document) {
        let $ctrl = this;

        // DEBUG & TEST
        // =========================
        // console.log(Trix.config);
        // =========================

        // $broadcast init method
        $rootScope.$broadcast('editorEvent', { editorInit: true });

        // component initialization
        $ctrl.$onInit = function () {
            // initialization element
            let element = 'npc-editor-init';

            // editor id == number of searched editors
            $ctrl.id = (angular.element(document).find(element).length).toString();

            // Colors
            $ctrl.colors = $ctrl.config && $ctrl.config.colors ? $ctrl.config.colors : [];

            // Define colors formats
            angular.forEach($ctrl.colors, function (value, key) {
                Trix.config.textAttributes[`color${value}`] = {
                    style: { 'color': '#' + value },
                    parser: function (element) {
                        var style = window.getComputedStyle(element),
                            // get RGB from HEX
                            r = $ctrl.hexToRgb(value).r,
                            g = $ctrl.hexToRgb(value).g,
                            b = $ctrl.hexToRgb(value).b;

                        // compare color style
                        return style.color === `rgb(${r}, ${g}, ${b})`;
                    }
                };
            });
        };

        // Current selected text attributes
        $ctrl.currentAttributes = {};
        // Titles (headings)
        $ctrl.titles = [1, 2, 3, 4, 5, 6];

        $ctrl.isActive = false;

        // Delete (undefine) the frozen attribute
        delete Trix.config.textAttributes.frozen;

        // Define "underline" format
        Trix.config.textAttributes.underline = { tagName: 'u' };

        // Define title`s formats
        angular.forEach($ctrl.titles, function (value, key) {
            Trix.config.blockAttributes[`title${value}`] = {
                tagName: 'h' + value
            };
        });

        // HEX to RGB convert function
        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        $ctrl.hexToRgb = function (hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        // Define center align
        Trix.config.blockAttributes.center = { tagName: 'center' };

        // Define justify align
        Trix.config.blockAttributes.justify = { tagName: 'article' };

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

        // show editor template (trix-editor directive) & toolbar
        // & check if some instace of editor exists
        $ctrl.revealTemplate = function () {
            // get number of trix-editor elements (must be 0)
            let numberOfElements = angular.element(document).find('trix-editor').length;

            // check if another editor is activated
            if (!numberOfElements) {
                $ctrl.templateSrc = angular.copy('/tpl.html');
                $rootScope.$broadcast('editorEvent', { disableEdit: true });
            }
        };

        // hide editor template (trix-editor directive) & toolbar
        $ctrl.hideTemplate = function () {
            $ctrl.templateSrc = angular.copy('');
            $rootScope.$broadcast('editorEvent', { disableEdit: false });
        };

        // catch $broadcasted editorEvent
        $rootScope.$on('editorEvent', function (event, args) {
            if (args.editorInit) {
                $ctrl.templateSrc = angular.copy('');
            }
        });

        // $broadcast editorEvent on scope $destroy
        $scope.$on('$destroy', function () {
            $rootScope.$broadcast('editorEvent', { disableEdit: false });
        });
    }
})();