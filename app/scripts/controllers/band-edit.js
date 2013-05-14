'use strict';

angular.module('angularMeetupApp').controller('BandEditCtrl',
    function($scope, $routeParams, apiService) {
      var bandId = $routeParams.bandId;

      if (bandId !== 'new') {
        apiService.band.get({id: bandId}, function(data) {
          $scope.item = data;
        });
      }

      // Get members.
      apiService.member.query({}, function(data) {
        $scope.members = data;
      });

      // Get albums.
      apiService.album.query(function(data) {
        $scope.albums = data;
      });

      // Add a new member.
      $scope.addMember = function() {
        $scope.item.members.push($scope.selectedMember);
      };

      // Remove a member.
      $scope.removeMember = function(member) {
        $scope.item.members = _.without($scope.item.members, member);
      };

      var handleError = function(response) {
        $scope.error = response.data;
      };

      $scope.saveBand = function() {
        $scope.message = '';

        var isNew = bandId === 'new',
            item = angular.copy($scope.item);

        if (isNew) {
          apiService.band.save(
              item,
              function(newItem) {
                $scope.item = newItem;
                $scope.message = 'Band created';
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
    });
