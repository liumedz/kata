commonControls.directive('smartTable', function(){
    return {
        restrict: 'E',
        scope:{
            tableDataSource: '='
        },
        template: '<div><input ng-model="search.cells[1]"/><table class="table"><thead><tr><th ng-repeat="column in tableColumns">{{column.title}} </br> <dropdown-multiselect on-checked="onChecked" model="column.checkedItems" options="column.checkItems"></dropdown-multiselect></th></tr></thead><tbody><tr ng-repeat="row in tableRows | filter:search:strict"><td ng-repeat="cell in row.cells track by $index">{{cell}}</td></tr></tbody> </table></div>',
        controller: function($scope, $filter){

            var tableData = null;

            $scope.tableDataSource.then(function(data){

                tableData = data;

                $scope.tableColumns = data.columns.map(function(columnItem){

                    var distinctColumnCells = [];
                    var i = 0;
                    data.rows.forEach(function(rowItem){
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


                $scope.tableRows = data.rows.map(function(rowItem){

                    var cells = [];

                    data.columns.forEach(function(columnItem){
                        cells.push(rowItem[columnItem.name]);
                    });

                    return {
                        row: rowItem,
                        cells: cells
                    }
                });

            });

            $scope.onChecked = function(){

                var rows = tableData.rows.map(function(rowItem){

                    var cells = [];

                    tableData.columns.forEach(function(columnItem){
                        var item = rowItem[columnItem.name];
                        cells.push(item);
                    });

                    return {
                        row: rowItem,
                        cells: cells
                    }
                });

                $scope.tableRows = rows.filter(function(rowData){

                    var result = false;

                    tableData.columns.forEach(function(columnItem){

                        var row = rowData.row[columnItem.name];

                        var checkedItems = columnItem.checkedItems.filter(function(selectedItem){

                            var checkItems = columnItem.checkItems.filter(function(checkItem){
                                return checkItem.id === selectedItem;
                            });

                            var filtered = checkItems.filter(function(checkItem){
                                return checkItem.name === row;
                            });

                            return filtered.length > 0;
                        });

                        if(checkedItems.length > 0){
                            result = true;
                            return;
                        }
                    });
                    return result;
                });
            }
        }
    }
});