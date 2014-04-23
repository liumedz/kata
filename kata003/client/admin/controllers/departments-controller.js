'use strict';

app.controller('departmentsController', ['$scope', '$location' , '$routeParams', 'customersResource', function ($scope, $location, $routeParams, customersResource) {

    var load = function(){
        customersResource.get({_id: $routeParams._id}).$promise.then(function(customer){
            $scope.customer = customer;
            $scope.department = customer.departments.length > 0 ? customer.departments[0] : (customer.departments.push({})[0]);
        });
    }

    $scope.onAdd = function(){
        $scope.department = {};
        $scope.customer.departments.push($scope.department);
    };

    $scope.onSave = function(customer){
        var _id = customer._id;
        delete customer._id;
        customersResource.update({ _id: _id }, customer);
    };

    $scope.onEdit = function(department){
        $scope.department = department;
    };

    $scope.onObject = function(department){
        $location.url('/admin/customers/' + $routeParams._id + '/departments/' + department._id + '/objects');
    };

    load();

}]);