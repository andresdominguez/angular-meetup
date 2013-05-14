'use strict';

var app = angular.module('angularMeetupApp', ['ngResource']);

app.config(function($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/band-list', {
        templateUrl: 'views/band-list.html',
        controller: 'BandListCtrl'
      })
      .when('/band-edit/:bandId', {
        templateUrl: 'views/band-edit.html',
        controller: 'BandEditCtrl'
      })
      .when('/member-list', {
        templateUrl: 'views/member-list.html',
        controller: 'MemberListCtrl'
      })
      .when('/member-edit/:memberId', {
        templateUrl: 'views/member-edit.html',
        controller: 'MemberEditCtrl'
      })
      .when('/album-list', {
        templateUrl: 'views/album-list.html',
        controller: 'AlbumListCtrl'
      })
      .when('/album-edit/:albumId', {
        templateUrl: 'views/album-edit.html',
        controller: 'AlbumEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});
