'use strict';

angular.module('angularMeetupApp').factory('mocks', function() {
  return {
    album: {
      getById: function() {
        return {
          name: 'Licensed to Ill',
          year: 1986
        };
      },
      getList: function() {
        return [
          {name: 'Check your head'},
          {name: 'Pauls boutique'}
        ];
      }
    },
    band: {
      getById: function() {
        return {
          name: 'Beastie boys',
          albums: [],
          members: []
        };
      },
      getList: function() {
        return [
          {name: 'Wu-Tang clan'},
          {name: 'Beastie boys'}
        ];
      }
    },
    member: {
      getById: function() {
        return {name: 'Method Man'};
      },
      getList: function() {
        return [
          {name: 'Michael "Mike D" Diamond'},
          {name: 'Adam "Ad-Rock" Horovitz'},
          {name: 'Adam "MCA" Yauch'}
        ];
      }
    }
  };
});
