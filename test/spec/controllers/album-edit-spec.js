'use strict';

describe('Controller: AlbumEditCtrl', function () {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var AlbumEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlbumEditCtrl = $controller('AlbumEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
