'use strict';

/* Controllers */

var theFixControllers = angular.module('theFixControllers', ['ngStorage']);
theFixControllers.controller('mainScreenCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage',
function ($scope, $http, $localStorage, $sessionStorage) {
    $scope.$storage = $localStorage.$default({
        day: 1
    });
    $http.get('foods/foods.json').success(function (data) {
        $scope.foods = data;
        $scope.totalFoods = data.length;
        $scope.orderProp = 'color';
    });
    $scope.plan = '1500-1799';
    $scope.foodsEaten = [];

    //$scope.greenGone = false, $scope.purpleGone = false;
    $scope.portions = {
        green: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
        purple: [{ eaten: false }, { eaten: false }, { eaten: false }],
        red: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
        yellow: [{ eaten: false }, { eaten: false }, { eaten: false }],
        blue: [{ eaten: false }],
        orange: [{ eaten: false }],
        tsp: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }]
    };

    $scope.getDailyPortions = function () {
        $scope.foodsEaten = [];
        switch ($scope.plan) {
            case '1200-1499':
                $scope.portions = {
                    green: [{ eaten: false }, { eaten: false }, { eaten: false }],
                    purple: [{ eaten: false }, { eaten: false }],
                    red: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    yellow: [{ eaten: false }, { eaten: false }],
                    blue: [{ eaten: false }],
                    orange: [{ eaten: false }],
                    tsp: [{ eaten: false }, { eaten: false }]
                };
                break;
            case '1500-1799':
                $scope.portions = {
                    green: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    purple: [{ eaten: false }, { eaten: false }, { eaten: false }],
                    red: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    yellow: [{ eaten: false }, { eaten: false }, { eaten: false }],
                    blue: [{ eaten: false }],
                    orange: [{ eaten: false }],
                    tsp: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }]
                };
                break;
            case '1800-2099':
                $scope.portions = {
                    green: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    purple: [{ eaten: false }, { eaten: false }, { eaten: false }],
                    red: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    yellow: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    blue: [{ eaten: false }],
                    orange: [{ eaten: false }],
                    tsp: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }]
                };
                break;
            case '2100-2300':
                $scope.portions = {
                    green: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    purple: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    red: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    yellow: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
                    blue: [{ eaten: false }],
                    orange: [{ eaten: false }],
                    tsp: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }]
                };
                break;
        }
    }
    $scope.eatFood = function (color, name) {
        var eatenPortions = 0;
        for (var i = 0; i < $scope.portions[color].length; i++) {
            if ($scope.portions[color][i].eaten) {
                eatenPortions++;
            }
            else {
                $scope.portions[color][i].eaten = true;
                $scope.foodsEaten.push({ 'color': color, 'name': name });
                eatenPortions++;
                break;
            }
        }
        //console.log($scope.portions[color].length + " || " + eatenPortions);
    };
    $scope.checkAvailable = function (color) {
        var eatenPortions = 0;
        for (var i = 0; i < $scope.portions[color].length; i++) {
            if ($scope.portions[color][i].eaten) {
                eatenPortions++;
            }
        }
        return eatenPortions === $scope.portions[color].length ? 'strikethrough' : null;
    };
    $scope.removeFood = function (color, name) {
        //remove the first color and name of this food in the foodsEaten model.
        for (var i = 0; i < $scope.foodsEaten.length; i++) {
            if ($scope.foodsEaten[i].color === color && $scope.foodsEaten[i].name === name) {
                $scope.foodsEaten.splice(i, 1);
                break;
            }
        }
        //Now remove the last eaten color 
        for (var i = $scope.portions[color].length - 1; i >= 0; i--) {
            if ($scope.portions[color][i].eaten) {
                $scope.portions[color][i].eaten = false;
                break;
            }
        }
    }
    $scope.saveDay = function () {
        $scope.$storage['Ate_Day_' + $scope.$storage.day] = JSON.stringify($scope.foodsEaten);
    }
    $scope.checkSavedFood = function () {
        $scope.foodsEaten = [];
        $scope.portions = {
            green: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
            purple: [{ eaten: false }, { eaten: false }, { eaten: false }],
            red: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }],
            yellow: [{ eaten: false }, { eaten: false }, { eaten: false }],
            blue: [{ eaten: false }],
            orange: [{ eaten: false }],
            tsp: [{ eaten: false }, { eaten: false }, { eaten: false }, { eaten: false }]
        };
        if ($scope.$storage['Ate_Day_' + $scope.$storage.day]) {
            var dayFoods = JSON.parse($scope.$storage['Ate_Day_' + $scope.$storage.day]);
            for (var i = 0; i < dayFoods.length; i++) {
                $scope.eatFood(dayFoods[i].color, dayFoods[i].name);
            }
        }
    }
    $scope.checkSavedFood();




    //$scope.newFoodsString = [];
    //$scope.newColor;
    //$scope.newFood;
    //$scope.concatNewFoods = function () {
    //    $scope.newFoodsString.push({ color: $scope.newColor, name: $scope.newFood });
    //};

}]);

//RESETS LOCAL STORAGE
//$localStorage.$reset();

//DELETE VALUES
// Both will do
//delete $scope.$storage.counter;
//delete $localStorage.counter;




//theFixControllers.controller('dunnoCtrl', ['$scope', '$routeParams', 'Phone',
//  function ($scope, $routeParams, Phone) {
//      $scope.phone = Phone.get({ phoneId: $routeParams.phoneId }, function (phone) {
//          $scope.mainImageUrl = phone.images[0];
//      });

//      $scope.setImage = function (imageUrl) {
//          $scope.mainImageUrl = imageUrl;
//      }
//  }]);



//$scope.containers = {
//    green: 3,
//    purple: 2,
//    red: 4,
//    yellow: 2,
//    blue: 1,
//    orange: 1,
//    tsp: 2
//};

//$scope.colorsEaten = {
//    green: 0,
//    purple: 0,
//    red: 0,
//    yellow: 0,
//    blue: 0,
//    orange: 0,
//    tsp: 0
//};

//$scope.getTimes = function (n) {
//    return new Array(n);
//};


//theFixControllers.controller('mainScreenCtrl', ['$scope', 'Phone',
//  function ($scope, Phone) {
//      $scope.phones = Phone.query();
//      $scope.orderProp = 'age';
//  }]);