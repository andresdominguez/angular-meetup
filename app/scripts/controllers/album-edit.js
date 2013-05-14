'use strict';

angular.module('angularMeetupApp').controller('AlbumEditCtrl',
    function($scope, $routeParams, apiService) {
      var albumId = $routeParams.albumId;
      if (albumId !== 'new') {
        apiService.album.get({id: albumId}, function(data) {
          $scope.item = data;
        })
      }

      var handleError = function(data) {
        debugger;
        $scope.error = data;
      };

      $scope.save = function() {
        $scope.message = '';
        var isNew = albumId === 'new',
            item = angular.copy($scope.item);

        if (isNew) {
          apiService.album.save(item, function(newItem) {
            $scope.item = newItem;
          }, handleError);
        } else {
          apiService.album.update({id: albumId}, _.omit(item, '_id'),
              function() {
                $scope.message = 'Item saved'
              }, handleError);
        }
      }
    });
