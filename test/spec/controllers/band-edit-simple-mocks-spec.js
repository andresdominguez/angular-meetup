'use strict';

ddescribe('Controller: BandEditCtrl', function() {

  beforeEach(module('angularMeetupApp'));

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  var BandEditCtrl,
      scope,
      controller,
      rootScope,
      $httpBackend,
      routeParams,
      theMocks;

  var createController = function(bandId) {
    routeParams.bandId = bandId;

    scope = rootScope.$new();
    BandEditCtrl = controller('BandEditCtrl', {
      $scope: scope
    });
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams, mocks) {
    controller = $controller;
    rootScope = $rootScope;
    $httpBackend = _$httpBackend_;
    routeParams = $routeParams;
    theMocks = mocks;
  }));

  it('should load existing band', function() {
    $httpBackend.whenGET('/bands/123').respond(theMocks.band.getById());
    $httpBackend.whenGET('/albums').respond(theMocks.album.getList());
    $httpBackend.whenGET('/members').respond(theMocks.member.getList());

    // Given that you load an exiting band.
    createController(123);
    expect(scope.item).toBeUndefined();
    expect(scope.albums).toBeUndefined();
    expect(scope.members).toBeUndefined();

    // When you receive the data.
    $httpBackend.flush();

    // Then ensure the scope variables contain the data.
    expect(scope.item).toEqualData(theMocks.band.getById());
    expect(scope.albums.length).toEqual(2);
    expect(scope.members.length).toEqual(3);
  });

  it('should load data for new band', function() {
    $httpBackend.whenGET('/albums').respond(theMocks.album.getList());
    $httpBackend.whenGET('/members').respond(theMocks.member.getList());

    // Given that you load a new band.
    createController('new');

    // When you receive the data.
    $httpBackend.flush();

    // Then ensure the album is undefined.
    expect(scope.item).toBeUndefined();

    // And ensure the albums and the members were loaded.
    expect(scope.albums.length).toEqual(2);
    expect(scope.members.length).toEqual(3);
  });

  it('should create new band', function() {
    $httpBackend.whenGET('/albums').respond(theMocks.album.getList());
    $httpBackend.whenGET('/members').respond(theMocks.member.getList());
    $httpBackend.whenPOST('/bands').respond({
      id: 1,
      name: 'Beastie boys'
    });

    // Given that you load a new band.
    createController('new');
    $httpBackend.flush();

    // When you add a new band.
    scope.item = {
      name: 'Beastie boys'
    };
    scope.saveBand();
    $httpBackend.flush();

    // Then ensure the album was created with id 1.
    expect(scope.item).toEqualData({id: 1, name: 'Beastie boys'});
  });

  it('should update an existing band', function() {
    $httpBackend.whenGET('/bands/123').respond(theMocks.band.getById());
    $httpBackend.whenGET('/albums').respond(theMocks.album.getList());
    $httpBackend.whenGET('/members').respond(theMocks.member.getList());
    $httpBackend.whenPUT('/bands/123').respond({
      id: 1,
      name: 'Beastie boys'
    });

    // Given that you load an existing band.
    createController(123);
    $httpBackend.flush();

    // When you update the band.
    expect(scope.message).toBeUndefined();
    scope.saveBand();
    $httpBackend.flush();

    // Then ensure a message is shown.
    expect(scope.message).toEqual('Band updated');
  });
});
