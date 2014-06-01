'use strict';

app.factory('commentRatingResource', ['$resource', function($resource) {
    return $resource('/api/ratings/:_id/comment', {id: '@_id'}, {'update': { method: 'PUT' }}  );
}]);
