(function () {
    'use strict';

    angular.module('schema.schemaInputModelDirective', [])
        .directive('npcSchemaInputModel', function ($compile) {
            return {
                restrict: 'E',
                scope: {
                    inputData: '<',
                    inputModel: '='
                },
                link: function (scope, elem, attr) {
                    var getTemplate = function (inputData, inputModel) {
                        var template;
                        // console.log(inputData.type);
                        switch (inputData.type) {
                            case 'boolean':
                                template = '<md-checkbox ng-model="inputModel" aria-label="inputData.label">'
                                + '{{inputData.label}}'
                                + '</md-checkbox>';
                                break;
                            case 'string':
                                template = '<md-input-container>'
                                    + '<label>{{inputData.label}}</label>'
                                    + '<input type="text" ng-model="inputModel">'
                                    + '</md-input-container>';
                                break;
                            case 'list':
                                template = '<md-input-container>'
                                    + '<label>{{inputData.label}}</label>'
                                    + '<md-select ng-model="inputModel">'
                                    + '<md-option ng-repeat="option in inputData.select" value="{{option.key}}">'
                                    + '{{option.value}}'
                                    + '</md-select>'
                                    + '</md-input-container>';
                                break;
                        }
                        return template;
                    };
                    elem.html(getTemplate(scope.inputData, scope.inputModel));
                    $compile(elem.contents())(scope);
                }
            }
        });
})();