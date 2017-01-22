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
                moveItem: '&moveItem'
            }
        });

    SchemaInputController.$inject = ['$mdDialog'];
    function SchemaInputController($mdDialog) {
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
            if (inputModel.includes("template-")) {
                // confirm template change
                $ctrl.showConfirm();
            }
        };

        // show config dialog
        $ctrl.showConfirm = function (ev) {
            // dialog configuration
            var confirm = $mdDialog.confirm()
                .title('Would you like to change template?')
                .textContent('Changing the template will delete associated data (content).')
                .ariaLabel('Delete data')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            // invoke configured confirm dialog
            $mdDialog.show(confirm).then(function () {
                // ok
                // TODO: change data (call BE)
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
    }
})();