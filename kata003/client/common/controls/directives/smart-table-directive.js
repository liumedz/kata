commonControls.directive('smartTable', function(){
    return {
        restrict: 'E',
        scope:{
            tableDataSource: '='
        },
        template: '<div><table class="table"><thead><tr><th ng-repeat="column in tableColumns">{{column.title}} </br> <dropdown-multiselect name="column.name" on-checked="onChecked" model="column.checkedItems" options="column.checkItems"></dropdown-multiselect></th></tr></thead><tbody><tr ng-repeat="row in tableRows | filter:search:strict"><td ng-repeat="cell in row.cells track by $index">{{cell}}</td></tr></tbody> </table></div>',
        controller: function($scope, $filter){

            var tableData = null;
            var fiterOrder = [];

            $scope.tableDataSource.then(function(data){
                tableData = data;
                fillColumns(tableData);
                fillRows(tableData);
            });

            $scope.onChecked = function(sender){
                fillRows(tableData);
                filter(sender);
            }

            var fillColumns = function(tableData){
                $scope.tableColumns = tableData.columns.map(function(columnItem){

                    var distinctColumnCells = [];
                    var i = 0;
                    tableData.rows.forEach(function(rowItem){
                        var filtered = distinctColumnCells.filter(function(item){
                            return item.name === rowItem[columnItem.name];
                        });

                        if(filtered.length === 0){
                            i++;
                            distinctColumnCells.push({
                                id: i,
                                name: rowItem[columnItem.name]
                            })
                        }
                    });
                    columnItem.checkItems = distinctColumnCells;
                    columnItem.checkedItems = [];
                    return columnItem;
                });
            };

            var fillRows = function(){
                $scope.tableRows = tableData.rows.map(function(rowItem){

                    var cells = [];

                    tableData.columns.forEach(function(columnItem){
                        cells.push(rowItem[columnItem.name]);
                    });

                    return {
                        row: rowItem,
                        cells: cells
                    }
                });
            };

            var filter = function(sender){

                $scope.tableColumns.forEach(function(tableColumn){
                    if(sender.name === tableColumn.name){
                        fiterOrder.push(tableColumn);
                    }
                });

                var filteredRows = [];

                $scope.tableRows.forEach(function(row){
                    sender.model.forEach(function(checkedItem){
                        if(row.row[sender.name] === checkedItem.name){
                            filteredRows.push(row);

                            for(var cellIndex = 0; cellIndex < row.cells.length; cellIndex++){
                                var cell = row.cells[cellIndex];
                                var column = $scope.tableColumns[cellIndex];
                                var filteredCheckItems = column.checkItems.filter(function(checkItem){
                                    return checkItem.name === cell;
                                });
                                if(filteredCheckItems.length === 0){
                                    column.checkItems.push({name: cell});
                                }
                            }
                        }
                    });
                });
                $scope.tableRows = filteredRows;
            };
        }
    }
});