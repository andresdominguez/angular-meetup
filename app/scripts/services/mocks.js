'use strict';

angular.module('angularMeetupApp').factory('mocks', function() {
  return {
    band: {
      getById: function() {
        return {
          name: 'Wu-Tang Clan',
          albums: [],
          members: []
        }
      },
      getList: function() {
        return [
          {name: 'Wu-Tang clan'},
          {name: 'The Police'}
        ]
      }
    },
    member: {
      getById: function() {
        return {name: 'Method Man'}
      },
      getList: function() {
        return [
          {name: 'Method Man'},
          {name: 'Ghostface Killah'}
        ];
      }
    }
  };
});
