var app=angular
  .module('App', [
    , 'ngRoute'
    , 'angularUtils.directives.dirPagination'
    , 'ngSanitize'
  ])
  .config(function($routeProvider,
      $locationProvider) {
    $routeProvider
    /*All Warehouse*/
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'home'
      })
      .when('/product/:id', {
        templateUrl: 'views/single.html',
        controller: 'single'
      })
    .otherwise('/');
  })

.run(['$rootScope', function ($scope) {
    
}]);