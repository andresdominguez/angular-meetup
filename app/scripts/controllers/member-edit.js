'use strict';

angular.module('angularMeetupApp')
    .controller('MemberEditCtrl', function($scope, $routeParams, apiService, $location) {

      var memberId = $routeParams.memberId;

      if (memberId !== 'new') {
        apiService.member.get({id: memberId}, function(data) {
          $scope.item = data;
        });
      }

      var handleError = function(response) {
        $scope.error = response.data;
      };

      // Delete the member.
      $scope.delete = function() {
        apiService.member.delete({id: memberId}, function() {
          $location.path('/member-list');
        }, handleError);
      };

      $scope.save = function() {
        $scope.message = '';

        var isNew = memberId === 'new',
            item = angular.copy($scope.item);

        if (isNew) {
          apiService.member.save($scope.item,
              function(newItem) {
                $location.path('/member-edit/' + newItem._id);
              }, handleError);
        } else {
          apiService.member.update({id: memberId}, _.omit(item, '_id'),
              function() {
                $scope.message = 'Member updated';
              }, handleError);
        }
      };
    });
