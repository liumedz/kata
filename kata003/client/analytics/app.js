'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.chart', 'common-controls', 'statistics']);

app.config(['$routeProvider' , '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/analytics',
        {
            templateUrl: "statistics-template.html",
            controller: 'statisticsController'
        });

}]);


