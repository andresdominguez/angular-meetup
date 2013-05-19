'use strict';

angular.module('angularMeetupApp').controller('BandEditCtrl',
    function($scope, $routeParams, apiService, $location) {
      var bandId = $routeParams.bandId;

      // Get members and albums.
      $scope.members = apiService.member.query();
      $scope.albums = apiService.album.query();

      var handleError = function(response) {
        $scope.error = response.data;
      };

      if (bandId !== 'new') {
        $scope.item = apiService.band.get({id: bandId}, function() {
        }, handleError);
      }

      $scope.saveBand = function() {
        $scope.message = '';

        var isNew = bandId === 'new',
            item = angular.copy($scope.item);

        if (isNew) {
          apiService.band.save(
              item,
              function(newItem) {
                $scope.item = newItem;
                $location.path('/band-edit/' + newItem._id);
              }, handleError);
        } else {
          apiService.band.update(
              {id: bandId},
              _.omit(item, '_id'),
              function() {
                $scope.message = 'Band updated';
              }, handleError);
        }
      };

      // Add a new member.
      $scope.addMember = function() {
        if (!$scope.item.members) {
          $scope.item.members = [];
        }
        $scope.item.members.push($scope.selectedMember);
      };

      // Add a new album.
      $scope.addAlbum = function() {
        if (!$scope.item.albums) {
          $scope.item.albums = [];
        }
        $scope.item.albums.push($scope.selectedAlbum);
      };

      // Remove a member.
      $scope.removeMember = function(member) {
        $scope.item.members = _.without($scope.item.members, member);
      };

      // Remove an album.
      $scope.removeAlbum = function(album) {
        $scope.item.albums = _.without($scope.item.albums, album);
      };
    });
