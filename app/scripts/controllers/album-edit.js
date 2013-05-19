'use strict';

angular.module('angularMeetupApp').controller('AlbumEditCtrl',
    function($scope, $routeParams, apiService, $location) {
      var albumId = $routeParams.albumId;
      if (albumId !== 'new') {
        apiService.album.get({id: albumId}, function(data) {
          $scope.item = data;
        });
      }

      var handleError = function(data) {
        $scope.error = data;
      };

      $scope.save = function() {
        $scope.message = '';
        var isNew = albumId === 'new',
            item = angular.copy($scope.item);

        if (isNew) {
          apiService.album.save(item, function(newItem) {
            $location.path('/album-edit/' + newItem._id);
          }, handleError);
        } else {
          apiService.album.update({id: albumId}, _.omit(item, '_id'),
              function() {
                $scope.message = 'Album updated';
              }, handleError);
        }
      };

      $scope.delete = function() {
        apiService.album.delete({id: albumId}, function(a) {
        }, handleError);
        $location.path('/album-list');
      };
    });
