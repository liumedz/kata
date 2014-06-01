'use strict';

commonControls.directive('smartTable', [ function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            tableDataSource: '=',
            tableDataLoaded: '&'
        },
        templateUrl: 'smart-table-template.html',
        controller: function($scope, $filter) {

            var tableData = null;
           
            $scope.filters = [];

            var fill = function() {
                var rows = tableData.rows;
                var columns = tableData.columns;

                $scope.tableRows = [];
                $scope.tableColumns = [];

                columns.forEach(function(column) {
                    column.checkItems = [];
                    column.checkedItems = [];
                    rows.forEach(function(row) {
                        var newCheckItem = { id: column.checkItems.length, name: row[column.name] };
                        var hasCheckItem = false;
                        column.checkItems.forEach(function(checkItem) {
                            if (checkItem.name === newCheckItem.name) {
                                hasCheckItem = true;
                                return;
                            }
                        });
                        if (!hasCheckItem && newCheckItem.name) {
                            column.checkItems.push(newCheckItem);
                            column.checkedItems.push(newCheckItem);
                        }
                    });
                    if (column.checkItems.length > 1) {
                        $scope.tableColumns.push(column);
                    }
                });

                rows.forEach(function(row) {
                    row.cells = [];
                    $scope.tableColumns.forEach(function(column) {
                        row.cells.push({value: row[column.name], type: Object.prototype.toString.call(row[column.name]) });
                    });
                    row.visibility = '';
                    $scope.tableRows.push(row);
                });
                $scope.tableDataLoaded({ tableData: tableData });
            };

            var fillFilters = function(row, column) {

                if (!column.checkItems) {
                    column.checkItems = [];
                }

                if (!column.checkedItems) {
                    column.checkedItems = [];
                }

                var hasCheckItem = false;
                column.checkItems.forEach(function(checkItem) {
                    if (angular.equals(checkItem.name, row[column.name])) {
                        hasCheckItem = true;
                        return;
                    }
                });

                if (!hasCheckItem) {
                    var checkItem = { id: column.checkItems.length, name: row[column.name] };
                    if (checkItem.name) {
                        column.checkItems.push(checkItem);
                        column.checkedItems.push(checkItem);
                    }
                }
            };

            var getColumn = function(sender) {
                var column = null;
                tableData.columns.forEach(function(currentColumn) {
                    if (currentColumn.name === sender.name) {
                        column = currentColumn;
                    }
                });
                return column;
            };

            var updateFilter = function(currentColumn) {
                var columnFilter = angular.copy(currentColumn);

                if ($scope.filters.length > 0) {
                    var lastColumn = $scope.filters[$scope.filters.length - 1];
                    if (lastColumn.name !== columnFilter.name) {
                        $scope.filters.push(columnFilter);
                    } else {
                        $scope.filters[$scope.filters.length - 1] = columnFilter;
                    }
                } else {
                    $scope.filters.push(columnFilter);
                }
            };

            var filterRows = function() {
                tableData.rows.forEach(function(row) {
                    if ($scope.filters.length > 0) {
                        $scope.filters.forEach(function(column) {
                            var filterIndex = $scope.filters.indexOf(column);
                            if (filterIndex === 0) {
                                row.visibility = '';
                            }
                            var show = false;
                            column.checkedItems.forEach(function(checkedItem) {
                                if (checkedItem && angular.equals(checkedItem.name, row[column.name])) {
                                    show = true;
                                }
                            });
                            if (show && row.visibility === '') {
                                row.visibility = '';
                            } else {
                                row.visibility = 'collapse';
                            }
                        });
                    } else {
                        row.visibility = '';
                    }

                });
            };

            var filter = function(sender) {
                var currentColumn = getColumn(sender);
                updateFilter(currentColumn);
                filterRows();
                tableData.columns.forEach(function(column) {
                    if (column.name !== currentColumn.name) {
                        column.checkItems = [];
                        column.checkedItems = [];
                        tableData.rows.forEach(function(row) {
                            if (row.visibility !== 'collapse') {
                                fillFilters(row, column);
                            }
                        });
                    } else {
                        column.checkItems = currentColumn.checkItems;
                        column.checkedItems = currentColumn.checkedItems.map(function(checkedItem) {
                            var item = null;
                            currentColumn.checkItems.forEach(function(checkItem) {
                                if (checkedItem.name === checkItem.name) {
                                    item = checkItem;
                                    return;
                                }
                            });
                            return item;
                        });
                    }
                });
                $scope.tableDataLoaded({ tableData: tableData });
            };

            $scope.$watch('tableDataSource.dataSourceDeferred', function() {
                if($scope.tableDataSource.dataSourceDeferred.promise){
                    $scope.tableDataSource.dataSourceDeferred.promise.then(function(data) {
                        tableData = data;
                        fill();
                        $scope.tableDataLoaded({ tableData: tableData});
                    });
                }
            });

//            $scope.tableDataSource.promise.then(function(data) {
//                tableData = data;
//                fill();
//                $scope.tableDataLoaded({ tableData: tableData});
//            });

            $scope.clearFilter = function(column) {
                var index = $scope.filters.indexOf(column);
                $scope.filters.splice(index, 1);
                if ($scope.filters.length !== 0) {
                    filter($scope.filters[$scope.filters.length - 1]);
                } else {
                    fill();
                }
            };

            $scope.onChecked = function(sender) {
                filter(sender);              
            };
        }
    };
}]);