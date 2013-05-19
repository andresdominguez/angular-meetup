'use strict';

angular.module('angularMeetupApp').controller('AlbumListCtrl',
    function($scope, $routeParams, apiService) {
      apiService.album.query(function(albums) {
        $scope.list = albums;
      });
    });
