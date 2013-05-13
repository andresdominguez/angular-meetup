'use strict';

angular.module('angularMeetupApp').
    controller('MemberListCtrl', function($scope, apiService) {
      apiService.member.query({}, function(data) {
        $scope.list = data;
      });
    });
