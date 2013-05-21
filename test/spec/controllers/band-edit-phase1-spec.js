'use strict';

describe('Controller: BandEditCtrl', function() {

  beforeEach(module('angularMeetupApp'));

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  var BandEditCtrl, scope, controller, rootScope, $httpBackend, routeParams;

  var createController = function(bandId) {
    routeParams.bandId = bandId;

    scope = rootScope.$new();
    BandEditCtrl = controller('BandEditCtrl', {
      $scope: scope
    });
  };

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams) {
    controller = $controller;
    rootScope = $rootScope;
    $httpBackend = _$httpBackend_;
    routeParams = $routeParams;
  }));

  it('should load existing band', function() {
    $httpBackend.whenGET('/bands/123').respond({
      name: 'Beastie boys',
      albums: [],
      members: []
    });
    $httpBackend.whenGET('/albums').respond([
      {name: 'Check your head'},
      {name: 'Pauls boutique'}
    ]);
    $httpBackend.whenGET('/members').respond([
      {name: 'Michael "Mike D" Diamond'},
      {name: 'Adam "Ad-Rock" Horovitz'},
      {name: 'Adam "MCA" Yauch'}
    ]);

    // Given that you load an exiting band.
    createController(123);
    expect(scope.item).toEqualData({});
    expect(scope.albums).toEqual([]);
    expect(scope.members).toEqual([]);

    // When you receive the data.
    $httpBackend.flush();

    // Then ensure the scope variables contain the data.
    expect(scope.item).toEqualData({
      name: 'Beastie boys',
      albums: [],
      members: []
    });
    expect(scope.albums.length).toEqual(2);
    expect(scope.members.length).toEqual(3);
  });

  it('should create new band', function() {
    $httpBackend.whenGET('/albums').respond([
      {name: 'Check your head'},
      {name: 'Pauls boutique'}
    ]);
    $httpBackend.whenGET('/members').respond([
      {name: 'Michael "Mike D" Diamond'},
      {name: 'Adam "Ad-Rock" Horovitz'},
      {name: 'Adam "MCA" Yauch'}
    ]);
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
    $httpBackend.whenGET('/bands/123').respond({
      name: 'Beastie boys',
      albums: [],
      members: []
    });
    $httpBackend.whenGET('/albums').respond([
      {name: 'Check your head'},
      {name: 'Pauls boutique'}
    ]);
    $httpBackend.whenGET('/members').respond([
      {name: 'Michael "Mike D" Diamond'},
      {name: 'Adam "Ad-Rock" Horovitz'},
      {name: 'Adam "MCA" Yauch'}
    ]);
    $httpBackend.whenPUT('/bands/123').respond();

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
