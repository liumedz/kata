commonControls.directive('smartTable', function(){
    return {
        restrict: 'E',
        scope:{
            tableDataSource: '='
        },
        template: '<div><table class="table"><thead><tr><th ng-repeat="column in tableColumns">{{column.title}} </br> <dropdown-multiselect on-checked="onChecked" model="column.checkedItems" options="column.checkItems"></dropdown-multiselect></th></tr></thead><tbody><tr ng-repeat="row in tableRows | filter:search:strict"><td ng-repeat="cell in row.cells track by $index">{{cell}}</td></tr></tbody> </table></div>',
        controller: function($scope, $filter){

            var tableData = null;

            $scope.tableDataSource.then(function(data){
                tableData = data;
                fillColumns(tableData);
                fillRows(tableData);
            });

            $scope.onChecked = function(){
                fillRows(tableData);
                filterRows();
            }

            var fillColumns = function(data){
                tableData = data;

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

            var filterRows = function(){
                var rows = $scope.tableRows;
                tableData.columns.forEach(function(columnItem){

                    var checkedItems = columnItem.checkedItems.map(function(checkedItem){
                        return columnItem.checkItems.filter(function(checkItem){
                            return checkItem.id === checkedItem;
                        })[0];
                    });

                    if(checkedItems.length !== 0){
                        var currentRows = [];
                        checkedItems.forEach(function(checkedItem){
                            var filteredRows = rows.filter(function(rowData){
                                var cell = rowData.row[columnItem.name];
                                if(cell === checkedItem.name){
                                    return true;
                                }
                            });
                            if(filteredRows.length > 0){
                                currentRows = currentRows.concat(filteredRows);
                            }
                        });
                        rows = currentRows;
                    }
                });
                $scope.tableRows = rows;
            };
        }
    }
});