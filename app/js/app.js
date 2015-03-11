'use strict';

/* App Module */

var theFixApp = angular.module('theFixApp', [
  'ngRoute',
  'theFixControllers',
  //'theFixFilters',
  //'theFixServices'
]);

theFixApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/main', {
            templateUrl: 'partials/main-screen.html',
            controller: 'mainScreenCtrl'
        }).
        //when('/phones/:phoneId', {
        //  templateUrl: 'partials/phone-detail.html',
        //  controller: 'PhoneDetailCtrl'
        //}).
        otherwise({
            redirectTo: '/main'
        });
  }]);
