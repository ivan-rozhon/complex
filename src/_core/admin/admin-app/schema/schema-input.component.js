(function () {
    'use strict';

    angular.module('schema.schemaInputComponent', [
        'schema.schemaInputModelDirective'
    ])
        .component('npcSchemaInput', {
            templateUrl: 'schema/schema-input.component.html',
            controller: SchemaInputController,
            bindings: {
                index: '<schemaIndex',
                lastIndex: '<schemaLastIndex',
                schema: '=schemaValue',
                schemaKey: '<?',
                schemaMainKey: '<?',
                schemaName: '<',
                schemaConfig: '<',
                deepLevel: '<',
                addItem: '&addItem',
                addSubItem: '&addSubItem',
                deleteItem: '&deleteItem',
                moveItem: '&moveItem',
                saveSchema: '&saveSchema'
            }
        });

    SchemaInputController.$inject = ['$mdDialog', 'toastService', 'schemaService', '$rootElement', '$scope'];
    function SchemaInputController($mdDialog, toastService, schemaService, $rootElement, $scope) {
        var $ctrl = this;

        // save old template value
        $ctrl.oldTemplate = angular.copy($ctrl.schema.template);

        // get type of input
        $ctrl.inputType = function (key) {
            return $ctrl.schemaConfig.data[key].type;
        };

        // get data config
        $ctrl.inputData = function (key) {
            return $ctrl.schemaConfig.data[key];
        };

        // Do add schema item action
        $ctrl.doAddItem = function () {
            $ctrl.addItem({ deepLevel: $ctrl.deepLevel, key: $ctrl.schemaMainKey, index: $ctrl.index });
        };

        // Add new schema item
        $ctrl.addSchemaItem = function (deepLevel, key, index) {
            // make copy of new item schema prototype
            $ctrl.newSchemaItem = angular.copy($ctrl.schemaConfig.schemes[key].add[deepLevel]);

            // add new schema item
            $ctrl.schema.sub.splice(index + 1, 0, $ctrl.newSchemaItem);
        };

        // Do delete item action
        $ctrl.doDeleteItem = function () {
            $ctrl.deleteItem({ key: $ctrl.schemaMainKey, index: $ctrl.index });
        };

        // Delete schema item
        $ctrl.deleteSchemaItem = function (key, index) {
            // delete schema item
            $ctrl.schema.sub.splice(index, 1);
        };

        // Do add sub schema item action
        $ctrl.doAddSubItem = function () {
            $ctrl.addSubItem({ deepLevel: $ctrl.deepLevel, key: $ctrl.schemaMainKey, index: $ctrl.index });
        };

        // Add new schema sub item
        $ctrl.addSchemaSubItem = function (deepLevel, key, index) {
            // make copy of new sub item schema prototype
            $ctrl.newSchemaSubItem = angular.copy($ctrl.schemaConfig.schemes[key].add[deepLevel + 1]);

            // add new schema sub item
            $ctrl.schema.sub[index].sub.push($ctrl.newSchemaSubItem);
        };

        // md-select changed
        $ctrl.onSelectChange = function (inputModel) {
            if (inputModel.includes("template-") && $ctrl.schema.data) {
                // confirm template change
                $ctrl.showTemplateConfirm();
            }
        };

        // show template change confirm dialog
        $ctrl.showTemplateConfirm = function (ev) {
            // dialog configuration
            var confirm = $mdDialog.confirm()
                .title('Would you like to change template?')
                .htmlContent('Changing the template will delete associated data.')
                .ariaLabel('Delete data')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            // invoke configured confirm dialog
            $mdDialog.show(confirm).then(function () {
                // ok -> update data model & save schema
                schemaService
                    .updateData($ctrl.schema.data, $ctrl.schema.template, $ctrl.schemaMainKey)
                    .then(function (result) {
                        if (result) {
                            // success - show info toast
                            toastService.simpleToast(true);
                        } else {
                            // failure (do undo change)
                            $ctrl.schema.template = $ctrl.oldTemplate;

                            // show info toast
                            toastService.simpleToast(false);
                        }
                    });
            }, function () {
                // cancel (undo change)
                $ctrl.schema.template = $ctrl.oldTemplate;
            });
        };

        // Do move up/down action
        $ctrl.doMoveItem = function (direction) {
            $ctrl.moveItem({ direction: direction, key: $ctrl.schemaMainKey, index: $ctrl.index });
        };

        // Move item
        $ctrl.moveSchemaItem = function (direction, key, index) {
            // set new index of item
            var newIndex = direction ? index - 1 : index + 1;

            // move item to new positon (newIndex)
            $ctrl.schema.sub.move(index, newIndex);
        };

        // Open data edit dialog
        $ctrl.doLoadData = function () {
            // check if data key exists
            if ($ctrl.schema.data) {
                // edit data
                schemaService
                    .loadData($ctrl.schema.data, $ctrl.schema.template)
                    .then(function (result) {
                        if (result) {
                            // success
                            $ctrl.showDataEdit(result.data, result.config);
                        } else {
                            // error - show info toast
                            toastService.simpleToast(false);
                        }
                    });

            } else {
                // create data (ask user)
                $ctrl.showDataConfirm();
            }
        };

        // show data edit dialog
        $ctrl.showDataEdit = function (data, config) {
            // input data
            $scope.key = angular.copy($ctrl.schema.data); // unique dataKey
            $scope.data = data;
            $scope.config = config;
            $scope.template = angular.copy($ctrl.schema.template); // template-name
            $scope.name = angular.copy($ctrl.schema.name);

            // show dialog
            $mdDialog.show({
                template: '<npc-data key="key" data="data" config="config" template="template" name="name"></npc-data>',
                parent: $rootElement,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            });
        };

        // show data creation confirm dialog
        $ctrl.showDataConfirm = function (ev) {
            // dialog configuration
            var confirm = $mdDialog.confirm()
                .title('Would you like to create a data model?')
                .textContent('The data model is necessary to modify the content associated with template.')
                .ariaLabel('Create data')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            // invoke configured confirm dialog
            $mdDialog.show(confirm).then(function () {
                // ok
                schemaService
                    .createData($ctrl.schema.template)
                    .then(function (result) {
                        if (result) {
                            // set new data key
                            $ctrl.schema.data = result.data;
                            // save schema
                            $ctrl.saveSchema();
                        } else {
                            // show info toast
                            toastService.simpleToast(false);
                        }
                    });
            }, function () {
                // cancel - nothing will happen
            });
        };
    }
})();