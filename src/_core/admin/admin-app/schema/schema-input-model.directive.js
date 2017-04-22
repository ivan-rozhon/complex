(function () {
    'use strict';

    angular.module('schema.schemaInputModelDirective', [])
        .directive('npcSchemaInputModel', function ($compile) {
            return {
                restrict: 'E',
                scope: {
                    inputData: '<',
                    isItem: '<',
                    inputModel: '=',
                    outputModel: '&'
                },
                link: function (scope, elem, attr) {
                    var getTemplate = function (inputData, inputModel, outputModel) {
                        var template;

                        switch (inputData ? inputData.type : null) {
                            case 'boolean':
                                template =
                                    '<md-input-container>' +
                                    '<md-checkbox class="md-primary" ng-model="inputModel" aria-label="inputData.label">' +
                                    '{{inputData.label}}' +
                                    '</md-checkbox>' +
                                    '</md-input-container>';
                                break;
                            case 'string':
                                template =
                                    '<md-input-container>' +
                                    '<label>{{inputData.label}}</label>' +
                                    '<input type="text" ng-model="inputModel" ng-disabled="isItem">' +
                                    '</md-input-container>';
                                break;
                            case 'list':
                                template =
                                    '<md-input-container>' +
                                    '<label>{{inputData.label}}</label>' +
                                    '<md-select ng-model="inputModel" ng-change="outputModel({ inputModel: inputModel})" ng-disabled="isItem">' +
                                    '<md-option ng-repeat="option in inputData.select" value="{{option.key}}">' +
                                    '{{option.value}}' +
                                    '</md-select>' +
                                    '</md-input-container>';
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