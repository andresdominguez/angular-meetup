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
        },
        update: {
          method: 'PUT'
        }
      });

      var member = $resource('/members/:id', {}, {});
      var album = $resource('/albums/:id', {}, {});

      return {
        album: album,
        band: band,
        member: member
      };
    });
