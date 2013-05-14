'use strict';

describe('Controller: AlbumListCtrl', function () {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var AlbumListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlbumListCtrl = $controller('AlbumListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
