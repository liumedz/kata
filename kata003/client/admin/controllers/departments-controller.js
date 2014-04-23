'use strict';

app.controller('departmentsController', ['$scope', '$location', '$routeParams', '$upload', 'customersResource', function ($scope, $location, $routeParams, $upload, customersResource) {

    var load = function() {
        customersResource.get({ _id: $routeParams._id }).$promise.then(function(customer) {
            $scope.customer = customer;
            selectFirst();
        });
    };

    var selectFirst = function() {
        if ($scope.customer.departments.length > 0) {
            $scope.department = $scope.customer.departments[0];
        } else {
            $scope.customer.departments.push({});
        }
        $scope.department = $scope.customer.departments[0];
    };

    $scope.onAdd = function(){
        $scope.department = {};
        $scope.customer.departments.push($scope.department);
    };

    $scope.onImport = function ($files) {
        var seperator = '\t';
        var reader = new FileReader();

        reader.onloadend = function() {

            var csvRows = reader.result.split('\n');

            var departments = {
                columns: ['Department'].concat(csvRows[0].split(seperator)),
                rows: []
            };

            for (var i = 1; i < csvRows.length; i++) {
                departments.rows.push(csvRows[i].split(seperator));
            }

            for (var i = 0; i < departments.rows.length; i++) {

                var department = {
                    _customerid: $routeParams._customerid,
                    d: departments.rows[i][0],
                    name: departments.rows[i][1],
                    code: departments.rows[i][2],
                    city: departments.rows[i][3],
                    address: departments.rows[i][4]
                };

                $scope.customer.departments.push(department);
            }

            $scope.$apply();
        };

        if ($files[0]) {
            reader.readAsText($files[0]);
        }
    };

    $scope.onSave = function(customer){
        var _id = customer._id;
        delete customer._id;
        customersResource.update({ _id: _id }, customer);
        load();
    };

    $scope.onEdit = function(department){
        $scope.department = department;
    };

    $scope.onDelete = function (department) {
        var index = $scope.customer.departments.indexOf(department);
        $scope.customer.departments.splice(index, 1);
        var _id = $scope.customer._id;
        delete $scope.customer._id;
        customersResource.update({ _id: _id }, $scope.customer);
        load();
    };

    $scope.onObject = function(department){
        $location.url('/admin/customers/' + $routeParams._id + '/departments/' + department._id + '/objects');
    };

    load();

}]);