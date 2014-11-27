weatherApp.factory("weatherService", function ($http) {
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

        arrayToCelsius: function (forecast) {
            for (var i = 0; i < forecast.length; i++) {
                forecast[i]['high'] = this.getCelsius(forecast[i]['high']);
            }

            return forecast;
        },

        getCelsius: function (fahrenheit) {
            celsius = (fahrenheit - 32) * 0.56
            return celsius; // Calculation goes here.
        }
    }
});
