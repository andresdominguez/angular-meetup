'use strict';

angular.module('angularMeetupApp').controller('AlbumListCtrl', function($scope, apiService) {
  $scope.list = apiService.album.query();
});
