var testHelper = angular.module('ControllerTestHelper', ['angularMeetupApp']);

testHelper.service('fakeResource', function(apiService, _$httpBackend_) {
  var h = _$httpBackend_;

  var members = [
    {name: 'Method Man'},
    {name: 'Ghostface Killah'}
  ];

  var addReturns = function(requestHandler, response) {
    requestHandler.respond(response)
  };

  var addWhenGet = function(url, response) {
    var requestHandler = h.whenGET(url);

    return {
      returnsDefault: function() {
        addReturns(requestHandler, response)
      }
    }
  };

  var member = {
    whenGetList: _.partial(addWhenGet, '/members', members)
  }

  return {
    member: member
  };
});
