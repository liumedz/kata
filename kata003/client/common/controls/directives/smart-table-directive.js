commonControls.directive('smartTable', function(){
    return {
        restrict: 'E',
        scope:{
            tableColumns: '=',
            tableRows: '='
        },
        template: '<table class="table"><thead><tr><th ng-repeat="column in tableColumns">{{column.name}} </br> <dropdown-multiselect pre-selected="member.checkItems" model="selected_items" options="column.checkItems"></dropdown-multiselect></th></tr></thead><tbody><tr ng-repeat="row in tableRows"><td ng-repeat="cell in row.cells">{{cell}}</td></tr></tbody> </table>',
        controller: function($scope){

            $scope.member = {checkItems: []};
            $scope.selected_items = [];

            $scope.tableColumns = $scope.tableColumns.map(function(columnItem){

                var distinctColumnCells = [];
                var i = 0;
                $scope.tableRows.forEach(function(rowItem){
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

                return columnItem;

            });



            $scope.tableRows = $scope.tableRows.map(function(rowItem){

                var cells = [];

                $scope.tableColumns.forEach(function(columnItem){
                    cells.push(rowItem[columnItem.name]);
                });

                return {
                    row: rowItem,
                    cells: cells
                }
            });

        }
    }
});