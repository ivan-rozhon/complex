(function () {
    "use strict";

    angular
        .module('shared.schemaItem', [])
        .directive('schemaItem', function () {
            return {
                restrict: 'E',
                scope: {
                    schema: '='
                },
                link: function (scope, elem, attr) {
                    // console.log(scope.$eval(attr.schema));
                    scope.schema = scope.$eval(attr.schema);
                    scope.schemaType = typeof scope.schema;
                    // console.log(scope.schema);
                },
                template: function (elem, attr) {
                    console.log(attr.schema);
                    return '<span>{{schema}}</span>';
                }
            }
        });
})();