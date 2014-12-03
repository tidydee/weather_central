/*global angular */

var weatherControllers = (function () {
    var weatherControllers = angular.module('weatherControllers', []);

    // Declare the application controller and inject the scope reference.
    weatherControllers.controller('AppCtrl', ['$scope', '$routeParams', 'weatherService', function ($scope, $routeParams ,weatherService) {
        // Define the title model.
        $scope.title = "AngularJS Tutorial - Yahoo Weather App";

                                      weatherService.getWeather('Vancouver').success(function (data) {
                                        weatherService.getWeather($scope, $routeParams.cityID);
                                        $scope.cityName = $routeParams.cityName;

                                        weatherService.getWeather($routeParams.cityName).success(function (data) {
                                          $scope.forecast = weatherService.getForecastFromData(data);
                                        });

                                        $scope.forecastVan = weatherService.getForecastFromData(data);
                                        // console.log("forecastVan");
                                        // console.log($scope.forecastVan);
                                        $scope.forecastDate = $scope.forecastVan[0]['date'];

                                        weatherService.getWeather('Honolulu').success(function (data) {
                                          $scope.forecastHon = weatherService.getForecastFromData(data);
                                          // console.log("forecastHon");
                                          // console.log($scope.forecastHon);
                                          weatherService.getWeather('San Diego').success(function (data) {
                                            $scope.forecastSan = weatherService.getForecastFromData(data);
                                            // console.log("forecastSan");
                                            // console.log($scope.forecastSan);
                                            weatherService.getWeather('Havana Cuba').success(function (data) {
                                              $scope.forecastHav = weatherService.getForecastFromData(data);
                                              // console.log("forecastHav");
                                              // console.log($scope.forecastHav);
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
                                      };
                                       // Temperature
                                      $scope.temperatureNames = ['C', 'F'];

                                      $scope.selectedTemperatureName = $scope.temperatureNames[1];

                                      $scope.changedTemperatureTo = function (temperatureName) {
                                        if (temperatureName == 'C') {
                                          $scope.forecastAll = weatherService.arrayToCelsius($scope.forecastAll);
                                        }
                                        else if (temperatureName == 'F') {
                                          $scope.forecastAll = weatherService.arrayToFahrenheit($scope.forecastAll);
                                        }
                                      };
    }]);
    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('ListCtrl', ['$scope', 'weatherService', 
                                  function ($scope, weatherService) {
      // Define the forecast data.  
    }]);

    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('WeatherCtrl', ['$scope', 
                                  function ($scope, weatherService) {
      // Define the forecast data.  
                                  }]);
    // Inject scope, $routeParams, and cardService  
    weatherControllers.controller('DetailCtrl', ['$scope', '$routeParams', 'weatherService',
                                  function ($scope, $routeParams, weatherService) {
                                    weatherService.getWeather($scope, $routeParams.cityID);
                                    $scope.cityName = $routeParams.cityName;

                                    weatherService.getWeather($routeParams.cityName).success(function (data) {
                                      $scope.forecast = weatherService.getForecastFromData(data);
                                    });

                                    $scope.changedDetailTemperatureTo = function (temperatureName) {
                                        debugger;
                                      if (temperatureName == 'C') {
                                        $scope.forecast = weatherService.arrayToCelsius($scope.forecast);
                                      }
                                      else if (temperatureName == 'F') {
                                        $scope.forecast = weatherService.arrayToFahrenheit($scope.forecast);
                                      }
                                    };
                                  }]);

    return weatherControllers;
}());
