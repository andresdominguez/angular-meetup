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
          settings.list.url, settings.list.response),
      whenGetList: _.partial(addWhenGet,
          settings.list.url, settings.list.response)
    }
  };

  var mock = {
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

  var member = createResource({
    byId: {
      url: new RegExp('/members/[0-9]+'),
      response: mock.member.getById()
    },
    list: {
      url: '/members',
      response: mock.member.getList()
    }
  });


  return {
    member: member
  };
});
