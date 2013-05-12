var testHelper = angular.module('ControllerTestHelper', ['angularMeetupApp']);

testHelper.service('fakeResource', function(apiService, _$httpBackend_) {
  var h = _$httpBackend_;

  var addReturns = function(requestHandler, response) {
    requestHandler.respond(_.isFunction(response) ? response() : response);
  };

  var addWhenGet = function(url, defaultResponse) {
    var requestHandler = h.whenGET(url);

    return {
      returnsDefault: function() {
        addReturns(requestHandler, defaultResponse)
      },
      returns: function(response) {
        addReturns(requestHandler, response)
      }
    }
  };

  var createResource = function(settings) {
    return {
      whenGetById: _.partial(addWhenGet,
          settings.byId.url, settings.byId.response),
      whenGetList: _.partial(addWhenGet,
          settings.list.url, settings.list.response)
    }
  };


  var mock = {
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

  return {
    band: createResource({
      byId: {
        url: new RegExp('/bands/[0-9]+'),
        response: mock.band.getById
      },
      list: {
        url: '/bands',
        response: mock.band.getList
      }
    }),
    member: createResource({
      byId: {
        url: new RegExp('/members/[0-9]+'),
        response: mock.member.getById
      },
      list: {
        url: '/members',
        response: mock.member.getList
      }
    })

  };
});
