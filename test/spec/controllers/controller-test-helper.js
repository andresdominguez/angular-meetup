var testHelper = angular.module('ControllerTestHelper', ['angularMeetupApp']);

testHelper.service('fakeResource', function(apiService, _$httpBackend_, apiService) {
  var h = _$httpBackend_;

  var createResource = function(settings) {
    var spy;

    var addReturns = function(requestHandler, response) {
      requestHandler.respond(_.isFunction(response) ? response() : response);
    };

    var addWhenGet = function(resource, settings) {
      var requestHandler = h.whenGET(settings.url);

      if (!spy) {
        spy = spyOn(resource, settings.method).andCallThrough();
      }

      return {
        returnsDefault: function() {
          addReturns(requestHandler, settings.response)
        },
        returns: function(response) {
          addReturns(requestHandler, response)
        }
      }
    };

    return {
      getSpy: function() {
        return spy;
      },
      whenGetById: _.partial(addWhenGet, settings.resource, settings.byId),
      whenGetList: _.partial(addWhenGet, settings.resource, settings.list)
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
      resource: apiService.band,
      byId: {
        url: new RegExp('/bands/[0-9]+'),
        response: mock.band.getById,
        method: 'get'
      },
      list: {
        url: '/bands',
        response: mock.band.getList,
        method: 'query'
      }
    }),
    member: createResource({
      resource: apiService.member,
      byId: {
        url: new RegExp('/members/[0-9]+'),
        response: mock.member.getById,
        method: 'get'
      },
      list: {
        url: '/members',
        response: mock.member.getList,
        method: 'query'
      }
    })

  };
});
