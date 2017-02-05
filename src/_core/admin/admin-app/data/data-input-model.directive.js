(function () {
    'use strict';

    angular.module('data.dataInputModelDirective', [])
        .directive('npcDataInputModel', function ($compile) {
            return {
                restrict: 'E',
                scope: {
                    inputData: '<',
                    inputModel: '='
                },
                link: function (scope, elem, attr) {
                    var getTemplate = function (inputData, inputModel) {
                        var template, block;

                        switch (inputData.type) {
                            case 'boolean':
                                template =
                                    '<md-input-container>' +
                                        '<md-checkbox class="md-primary" ng-model="inputModel" aria-label="inputData.label">' +
                                            '{{inputData.label}}' +
                                        '</md-checkbox>' +
                                    '</md-input-container>';
                                break;
                            case 'string':
                                // if string has "long" attribute set class="md-block"
                                block = inputData.long ? 'md-block' : '';

                                template =
                                    '<md-input-container class="' + block + '">' +
                                        '<label>{{inputData.label}}</label>' +
                                        '<input type="text" ng-model="inputModel">' +
                                    '</md-input-container>';
                                break;
                            case 'list':
                                template =
                                    '<md-input-container>' +
                                        '<label>{{inputData.label}}</label>' +
                                        '<md-select ng-model="inputModel">' +
                                            '<md-option ng-repeat="option in inputData.select" value="{{option.key}}">' +
                                            '{{option.value}}' +
                                        '</md-select>' +
                                    '</md-input-container>';
                                break;
                            case 'textarea':
                                template =
                                    '<md-input-container class="md-block">' +
                                        '<label>{{inputData.label}}</label>' +
                                        '<textarea ng-model="inputModel"></textarea>' +
                                    '</md-input-container>';
                                break;
                            case 'chips':
                                template =
                                    '<md-chips placeholder="{{inputData.label}}" class="md-block" ng-model="inputModel" readonly="false" md-removable="true">' +
                                    '</md-chips>';
                                break;
                        }
                        return template;
                    };
                    elem.html(getTemplate(scope.inputData, scope.inputModel));
                    $compile(elem.contents())(scope);
                }
            };
        });
})();