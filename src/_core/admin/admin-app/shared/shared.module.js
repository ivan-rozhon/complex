(function (angular) {
    'use strict';
    angular.module('adminApp.shared', [
            'shared.auth',
            'shared.editorComponent',
            'shared.toastService'
        ]);
})(window.angular);