var testHelper = angular.module('ControllerTestHelper', ['angularMeetupApp']);

testHelper.service('fakeResource', function(apiService, _$httpBackend_, mocks) {
  var h = _$httpBackend_;

  var createResource = function(settings) {
    var spy;

    var addReturns = function(requestHandler, response) {
      requestHandler.respond(_.isFunction(response) ? response() : response);
    };

    var addWhenGet = function(resource, settings) {
      var requestHandler = h.whenGET(settings.url);

      if (!spy) {
        console.log('Creating spy for', resource, settings);
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

  return {
    album: createResource({
      resource: apiService.album,
      list: {
        url:  '/albums',
        response: mocks.band.getList,
        method: 'query'
      }
    }),
    band: createResource({
      resource: apiService.band,
      byId: {
        url: new RegExp('/bands/[0-9]+'),
        response: mocks.band.getById,
        method: 'get'
      },
      list: {
        url: '/bands',
        response: mocks.band.getList,
        method: 'query'
      }
    }),
    member: createResource({
      resource: apiService.member,
      byId: {
        url: new RegExp('/members/[0-9]+'),
        response: mocks.member.getById,
        method: 'get'
      },
      list: {
        url: '/members',
        response: mocks.member.getList,
        method: 'query'
      }
    })

  };
});
