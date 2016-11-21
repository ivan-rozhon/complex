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
                        switch(inputType) {
                            case 'string':
                                template = '<input ng-model="inputModel">';
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