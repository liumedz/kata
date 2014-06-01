'use strict';


app.controller('importRatingsController', ['$scope', '$location', '$upload', 'ratingsResource', function ($scope, $location, $upload, ratingsResource) {

    var load = function () {
        $scope.ratings = ratingsResource.query();
    };

    $scope.onImport = function ($files) {

        var reader = new FileReader();
        reader.onloadend = function() {

            var ratingsJSON = JSON.parse(reader.result);
            var ratingsResult = ratingsJSON.map(function(rating){
                return {
                    created: rating[0],
                    c: rating[1],
                    d: rating[2],
                    o: rating[3],
                    r: rating[4],
                    isImported: true,
                    clientInfo: {
                        ip: rating[5],
                        agent: rating[6]
                    }
                }
            });

            ratingsResult.forEach(function(item){
                ratingsResource.save(item);
            });

            $scope.ratings = ratingsResult;

            $scope.$apply();
        };

        if ($files[0]) {
            reader.readAsText($files[0]);
        }
    };

    $scope.onDisable = function(rating){
        ratingsResource.update({_id: rating._id}, rating);
    }

    load();

}]);