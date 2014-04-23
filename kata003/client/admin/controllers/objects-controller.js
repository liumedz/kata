'use strict';

app.controller('objectsController', ['$scope', '$location' , '$routeParams', 'customersResource', function ($scope, $location, $routeParams, customersResource) {

    var load = function(){
        customersResource.get({_id: $routeParams._id}).$promise.then(function(customer){
            $scope.customer = customer;
            $scope.department = customer.departments.filter(function(item){
                return item._id === $routeParams._departmentId;
            })[0];
            $scope.object = $scope.department.objects.length > 0 ? $scope.department.objects[0] : ($scope.department.objects.push({})[0]);
        });
    }

    $scope.onAdd = function(){
        $scope.object = {};
        $scope.department.objects.push($scope.object);
    };

    $scope.onSave = function(customer){
        var _id = customer._id;
        delete customer._id
        customersResource.update({ _id: _id }, customer);
    };

    $scope.onEdit = function(object){
        $scope.object = object;
    };

    $scope.onObject = function(department){
        $location.url('/admin/customers/' + $routeParams._id + '/departments/' + department._id + '/objects');
    };

    load();
}]);