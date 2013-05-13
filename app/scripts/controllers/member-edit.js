'use strict';

angular.module('angularMeetupApp')
    .controller('MemberEditCtrl', function($scope, $routeParams, apiService, $location) {

      var memberId = $routeParams.memberId;

      if (memberId !== 'new') {
        apiService.member.get({id: memberId}, function(data) {
          $scope.item = data;
        });
      }

      $scope.delete = function() {
        apiService.member.delete({id: memberId}, function() {
          $location.path('/member-list');
        });
      };

      $scope.save = function() {
        apiService.member.save({}, $scope.item,
            function(newItem, b) {
              $scope.item = newItem;
            })
      };
    });
