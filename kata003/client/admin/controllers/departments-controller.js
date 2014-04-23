'use strict';

app.controller('departmentsController', ['$scope', '$location' , '$routeParams', 'customersResource', function ($scope, $location, $routeParams, customersResource) {

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