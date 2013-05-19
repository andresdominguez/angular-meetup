var testHelper = angular.module('ControllerTestHelper', ['angularMeetupApp']);

testHelper.service('fakeResource', function(apiService, _$httpBackend_, mocks) {
  var h = _$httpBackend_;

  var createResource = function(settings) {
    var getSpy, createSpy, updateSpy;

    var addReturns = function(requestHandler, response) {
      requestHandler.respond(_.isFunction(response) ? response() : response);
    };

    var addWhenGet = function(resource, settings) {
      var requestHandler = h.whenGET(settings.url);

      if (!getSpy) {
        getSpy = spyOn(resource, settings.method).andCallThrough();
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

    var addWhenCreate = function(resource, settings) {
      var requestHandler = h.whenPOST(settings.url);

      if (!createSpy) {
        createSpy = spyOn(resource, settings.method).andCallThrough();
      }

      return {
        returns: function(data) {
          requestHandler.respond(data);
        }
      }
    };

    var addWhenUpdate = function(resource, settings) {
      var requestHandler = h.whenPUT(settings.url);

      if (!updateSpy) {
        updateSpy = spyOn(resource, settings.method).andCallThrough();
      }

      return {
        returns: function(data) {
          requestHandler.respond(data);
        }
      }
    };

    return {
      getSpy: function() {
        return getSpy;
      },
      getCreateSpy: function() {
        return createSpy;
      },
      getUpdateSpy: function() {
        return updateSpy;
      },
      whenGetById: _.partial(addWhenGet, settings.resource, settings.byId),
      whenGetList: _.partial(addWhenGet, settings.resource, settings.list),
      whenCreate: _.partial(addWhenCreate, settings.resource, settings.create),
      whenUpdate: _.partial(addWhenUpdate, settings.resource, settings.update)
    }
  };

  return {
    flush: h.flush,
    album: createResource({
      resource: apiService.album,
      byId: {
        url: new RegExp('/albums/[0-9]+'),
        response: mocks.album.getById,
        method: 'get'
      },
      create: {
        url: '/albums',
        method: 'save'
      },
      list: {
        url: '/albums',
        response: mocks.band.getList,
        method: 'query'
      },
      update: {
        url: new RegExp('/albums/[0-9]+'),
        method: 'update'
      }
    }),
    band: createResource({
      resource: apiService.band,
      byId: {
        url: new RegExp('/bands/[0-9]+'),
        response: mocks.band.getById,
        method: 'get'
      },
      create: {
        url: '/bands',
        method: 'save'
      },
      list: {
        url: '/bands',
        response: mocks.band.getList,
        method: 'query'
      },
      update: {
        url: new RegExp('/bands/[0-9]+'),
        method: 'update'
      }
    }),
    member: createResource({
      resource: apiService.member,
      byId: {
        url: new RegExp('/members/[0-9]+'),
        response: mocks.member.getById,
        method: 'get'
      },
      create: {
        url: '/members',
        method: 'save'
      },
      list: {
        url: '/members',
        response: mocks.member.getList,
        method: 'query'
      },
      update: {
        url: new RegExp('/members/[0-9]+'),
        method: 'update'
      }
    })
  };
});
