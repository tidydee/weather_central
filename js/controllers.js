﻿/*global angular */

var weatherControllers = (function () {
    var weatherControllers = angular.module('weatherControllers', []);

    // Declare the application controller and inject the scope reference.
    weatherControllers.controller('AppCtrl', ['$scope', function ($scope) {
        // Define the title model.
        $scope.title = "AngularJS Tutorial";
    }]);
    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('ListCtrl', ['$scope', 'weatherService',
                                  function ($scope, weatherService) {
                                      // Define the forecast data.  
                                  }]);

    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('WeatherCtrl', ['$scope', 'weatherService',
                                  function ($scope, weatherService) {
                                      // Define the forecast data.		
                                      // forcastOne >
                                      weatherService.getWeather('Vancouver').success(function (data) {
                                        $scope.forecastVan = weatherService.getForecastFromData(data);
                                        console.log("forecastVan");
                                        console.log($scope.forecastVan);
                                        console.log($scope.forecastVan[0]);
                                        
                                        // $scope.dateToday = []
                                        // console.log("$scope.dateToday");
                                        // console.log($scope.dateToday);
                                        // for(var i = 0; i < $scope.forecastVan.length; i++) {
                                        //   x = $scope.forecastVan[i].date
                                        //   $scope.dateToday.push(x);
                                        //   console.log('x');
                                        //   console.log(x);
                                        // }


                                        weatherService.getWeather('Honolulu').success(function (data) {
                                          $scope.forecastHon = weatherService.getForecastFromData(data);
                                          console.log("forecastHon");
                                          console.log($scope.forecastHon);
                                          console.log($scope.forecastHon[0]);
                                          weatherService.getWeather('San Diego').success(function (data) {
                                            $scope.forecastSan = weatherService.getForecastFromData(data);
                                            console.log("forecastSan");
                                            console.log($scope.forecastSan);
                                            console.log($scope.forecastSan[0]);
                                            weatherService.getWeather('Havana Cuba').success(function (data) {
                                              $scope.forecastHav = weatherService.getForecastFromData(data);
                                              console.log("forecastHav");
                                              console.log($scope.forecastHav);
                                              console.log($scope.forecastHav[0]);
                                              x = $scope.forecastHav[0];

                                              console.log(x);
                                              // Create index model
                                              $scope.forecastAll = [$scope.forecastVan[0], $scope.forecastHon[0], $scope.forecastSan[0], $scope.forecastHav[0]]
                                            });
                                          });
                                        });
                                      });

                                      $scope.cityNameForForecast = function (forecast) {
                                        if ($scope.forecastVan[0] == forecast) {
                                          return 'Vancouver';
                                        }
                                        else if ($scope.forecastHon[0] == forecast) {
                                          return 'Honolulu';
                                        }
                                        else if ($scope.forecastSan[0] == forecast) {
                                          return 'San Diego';
                                        }
                                        else if ($scope.forecastHav[0] == forecast) {
                                          return 'Havana Cuba';
                                        }
                                      }

                                      // Temperature
                                      // $scope.selectedCelcius = true;

                                      $scope.temperatureNames = ['C', 'F'];
                                      $scope.selectedTemperatureName = $scope.temperatureNames[1];
                                      // F -> C FORMULA: (°F  -  32)  x  0.56 = °C
                                      $scope.tempConverter = function(temp) {

                                      }

                                      $scope.changedTemperatureTo = function (temperatureName) {
                                        $scope.selectedTemperatureName = temperatureName
                                      };
                                  }]);
    return weatherControllers;
}());
