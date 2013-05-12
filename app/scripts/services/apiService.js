'use strict';

angular.module('angularMeetupApp').
    factory('apiService', function($resource) {
      var band = $resource('/bands/:id', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        get: {
          method: 'GET'
        }
      });

      var member = $resource('/members/:id', {}, {});

      return {
        band: band,
        member: member
      };
    });
