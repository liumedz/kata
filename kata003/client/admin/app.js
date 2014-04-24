'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'angularFileUpload']);

app.config(['$routeProvider' , '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/admin',
        {
            templateUrl: "overview-template.html",
            controller: 'overviewController'
        });
    $routeProvider.when('/admin/users',
        {
            templateUrl: "users-template.html",
            controller: 'usersController'
        });
    $routeProvider.when('/admin/customers',
        {
            templateUrl: "customers-template.html",
            controller: 'customersController'
        });
    $routeProvider.when('/admin/customers/:_id/departments',
        {
            templateUrl: "departments-template.html",
            controller: 'departmentsController'
        });
    $routeProvider.when('/admin/customers/:_id/departments/:_departmentId/objects',
        {
            templateUrl: "objects-template.html",
            controller: 'objectsController'
        });
    $routeProvider.when('/admin/customers/:_id/departments/:_departmentId/objects/:_objectId/ratingtypes',
        {
            templateUrl: "ratingtypes-template.html",
            controller: 'ratingTypesController'
        });

   // $routeProvider.otherwise({redirectTo: '/admin'});

}]);

