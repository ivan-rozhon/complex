(function () {
    'use strict';

    angular.module('schema.schemaInputModelDirective', [])
        .directive('npcSchemaInputModel', function ($compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    inputType: '<',
                    inputModel: '='
                },
                link: function (scope, elem, attr) {
                    var getTemplate = function (inputType, inputModel) {
                        var template;
                        // console.log(inputModel);
                        switch (inputType) {
                            case 'string':
                                template = '<md-input-container>'
                                    + '<label>Label</label>'
                                    + '<input type="text" ng-model="inputModel">'
                                    + '</md-input-container>';
                                break;
                        }
                        return template;
                    };
                    elem.html(getTemplate(scope.inputType, scope.inputModel));
                    $compile(elem.contents())(scope);
                }
            }
        });
})();