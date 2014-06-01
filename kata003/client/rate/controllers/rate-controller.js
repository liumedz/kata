'use strict';

app.controller('rateController', [ '$scope', '$location', '$cookies' , 'rateResource', 'commentRatingResource', function ($scope, $location, $cookies, rateResource, commentRatingResource) {

    var fingerprint = new Fingerprint().get();
    var userAgent = navigator.userAgent;
    var clientInfo = { fingerprint: fingerprint, userAgent: userAgent};
    var _commentId = '';

    var rate = function(){
        rateResource.save({clientInfo: clientInfo}, function(data){
            $scope.info = data.message;
            if(data.error === 0){
                $scope.disabled = false;
                _commentId = data._commentId;
            }
            else{
                $scope.showComment = false;
            }
        });
    };

    $scope.rating = new Array(parseInt(angular.element('#rating-value').val()));
    $scope.disabled = true;
    $scope.showComment = true;
    $scope.comment = '';

    $scope.onComment = function(){
        commentRatingResource.update({_id: _commentId}, {comment: $scope.comment}, function(data){
            $scope.showComment = false;
        });
    };

    rate();
}]);