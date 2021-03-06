﻿weatherApp.factory("weatherService", function ($http) {
    'use strict';
    return {
        doSomething: function ($scope) {
        },
        getWeather: function (city) {
            var url = this.getUrlForCity(city);
            return $http.get(url);
        },
        getUrlForCity: function (city) {
            // Weather codes:
            var weatherCodes = {'Vancouver': 'CAXX0518', 'Honolulu': 'USHI0026', 'San Diego': 'USCA0982', 'Havana Cuba': 'CUXX0003'}

            var city     = weatherCodes[city] // Now on can call all cities at once
            var yahooAPI = "'http://weather.yahooapis.com/forecastrss?p=";
            var format   = "'&format=json&diagnostics=true&callback=";
            var yql      = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D";
            var url      = yql + yahooAPI+ city + format;
            return url;
        },

        getForecastFromData: function (data) {
            try {

                var stringified = JSON.stringify(data);          // Convert to a string.
                stringified = stringified.split("\\n").join(""); // Remove new line '/n'.
                var listing = JSON.parse(stringified);           // Convert to object.
                var forecast = [];                               // Store 5 day forecast.
                var forecastDate = [];                           // Stores forecast date
                for (var result in listing) {
                    for (var item in listing[result].results) {
                        for (var day in listing[result].results.item.forecast) {
                            forecast.push(listing[result].results.item.forecast[day]);
                        }
                    }
                }
            }
            catch (error) {
                alert("Weather reading error:" + error.name + ": "
                    + error.message);
            }
            return forecast;
        },
        //convert to C
        arrayToCelsius: function (forecastArray) {
            for (var i = 0; i < forecastArray.length; i++) {
                forecastArray[i]['high'] = this.getCelsius(forecastArray[i]['high']);
                forecastArray[i]['low'] = this.getCelsius(forecastArray[i]['low']);
            }

            return forecastArray;
        },

        getCelsius: function (fahrenheit) {
            var fTempVal = this.getForecastFromData(fahrenheit);
            var celsius = ((fahrenheit - 32) * 0.56).toFixed(0);
            return celsius;
        },
        //convert to F
        arrayToFahrenheit: function (forecastArray) {
            for (var i = 0; i < forecastArray.length; i++) {
                forecastArray[i]['high'] = this.getFahrenheit(forecastArray[i]['high']);
                forecastArray[i]['low'] = this.getFahrenheit(forecastArray[i]['low']);
            }

            return forecastArray;
        },

        getFahrenheit: function (celsius) {
            var fTempVal = this.getForecastFromData(celsius);
             var fahrenheit = ((celsius * 9/5) + 32).toFixed(0);
            return fahrenheit;
        }
    }
});
