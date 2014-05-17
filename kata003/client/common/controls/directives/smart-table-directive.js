commonControls.directive('smartTable', function(){
    return {
        restrict: 'E',
        scope:{
            tableDataSource: '='
        },
        template: '<div><div><ul class="list-inline"><li ng-repeat="filter in filters track by $index"> {{filter.name}} <ul><li ng-repeat="checkedItem in filter.checkedItems">{{checkedItem.name}}</li> </ul></li></ul></div> <table class="table"><thead><tr><th ng-repeat="column in tableColumns">{{column.title}} </br> <dropdown-multiselect caption="column.title" name="column.name" on-checked="onChecked" model="column.checkedItems" options="column.checkItems"></dropdown-multiselect></th></tr></thead><tbody><tr ng-repeat="row in tableRows | filter:search:strict" class="{{row.visibility}}"><td ng-repeat="cell in row.cells track by $index">{{cell}}</td></tr></tbody> </table></div>',
        controller: function($scope, $filter){

            var tableData = null;
            $scope.filters = [];

            var fill = function(){

                var rows = tableData.rows;
                var columns = tableData.columns;


                rows.forEach(function(row){
                    columns.forEach(function(column){
                        if(!row.cells){
                            row.cells = [];
                        }
                        row.cells.push(row[column.name]);

                        fillFilters(row, column);
                    });
                });
                $scope.tableRows = rows;
                $scope.tableColumns = columns;
            };

            var fillFilters = function(row, column){

                if(!column.checkItems){
                    column.checkItems = [];
                }

                if(!column.checkedItems){
                    column.checkedItems = [];
                }

                var hasCheckItem = false;
                column.checkItems.forEach(function(checkItem){
                    if(checkItem.name === row[column.name]){
                        hasCheckItem = true;
                        return;
                    }
                });

                if(!hasCheckItem){
                    var checkItem = {id: column.checkItems.length, name: row[column.name]};
                    column.checkItems.push(checkItem);
                    column.checkedItems.push(checkItem);
                }
            }

            var getColumn = function(sender){
                var column = null;
                tableData.columns.forEach(function(currentColumn){
                    if(currentColumn.name === sender.name){
                        column = currentColumn;
                    }
                });
                return column;
            }

            var setRowFilterItemVisibility = function(row, currentColumn, visibility){
                tableData.columns.forEach(function(column){
                    if(column.name != currentColumn.name){
                        column.checkItems.forEach(function(checkItem){
                            if(checkItem.name === row[column.name]){
                                checkItem.visibility = visibility;
                            }
                        });
                    }
                });
            }

            var updateFilter = function(currentColumn){
                var columnFilter = angular.copy(currentColumn);

                if($scope.filters.length > 0){
                    var lastColumn = $scope.filters[$scope.filters.length - 1];
                    if(lastColumn.name !== columnFilter.name){
                        $scope.filters.push(columnFilter);
                    }
                    else{
                        $scope.filters[$scope.filters.length - 1] = columnFilter;
                    }
                }
                else{
                    $scope.filters.push(columnFilter);
                }
            }

            var filterRows = function(){
                tableData.rows.forEach(function (row) {
                    $scope.filters.forEach(function (column) {
                        var filterIndex = $scope.filters.indexOf(column);
                        if(filterIndex === 0){
                            row.visibility = '';
                        }
                        var show = false;
                        column.checkedItems.forEach(function (checkedItem) {
                            if (checkedItem.name === row[column.name]) {
                                show = true;
                            }
                        });
                        if (show && row.visibility === '') {
                            row.visibility = '';
                        }
                        else{
                            row.visibility = 'collapse';
                        }
                    });
                });
            }

            var filter = function (sender, isChecked) {
                var currentColumn = getColumn(sender);
                updateFilter(currentColumn);
                filterRows();
                tableData.columns.forEach(function(column){
                    if(column.name !== currentColumn.name){
                        column.checkItems = [];
                        column.checkedItems = [];
                        tableData.rows.forEach(function(row){
                            if(row.visibility !== 'collapse'){
                                fillFilters(row, column);
                            }
                        });
                    }
                });
            };

            $scope.tableDataSource.then(function(data){
                tableData = data;
                fill();
            });

            $scope.onChecked = function(sender, isChecked){
                filter(sender, isChecked);
            };
        }
    }
});