'use strict';

describe('Controller: BandListCtrl', function () {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var BandListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BandListCtrl = $controller('BandListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
