//https://github.com/donavon/json_

(
    function () {
    "use strict";

    var JSON_: any = {};

    function snakeToCamelCase(key) {
        // first_name -> firstName, isbn_10 -> isbn10, scores_a_1 -> scoresA1
        return key.replace(/(_+[a-z0-9])/g, function (snip) {
            return snip.toUpperCase().replace("_", "");
        });
    }

    function camelToSnakeCase(key) {
        // firstName -> first_name, isbn10 -> isbn_10, scoresA1 -> scores_a_1
        return key.replace(/([A-Za-z])([0-9])/g, function (snip, char, digit) {
            return char + "_" + digit;
        }).replace(/([A-Z])/g, function (snip) {
            return "_" + snip.toLowerCase();
        });
    }

    JSON_.parse = function parse(responseOrText, reviver) {
        if (typeof responseOrText === 'string') {
            var text = responseOrText.replace(/"([^"]*)"\s*:/g, snakeToCamelCase);
            return JSON.parse(text, reviver);
        }
        return responseOrText.text().then(parse); // Assume text is a Response object from fetch.
    };

    JSON_.stringify = function stringify(value, replacer, space) {
        var str = JSON.stringify(value, replacer, space);
        return str.replace(/"([^"]*)"\s*:/g, camelToSnakeCase);
    };

    // Export to popular environments boilerplate.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = JSON_;
    } else {
        window["JSON_"] = JSON_;
    }
})();


// const example = {
//     firstName: "John",
//     lastName: "Doe",
//     isbn10: "1234567890"
// };

// console.log(JSON_.stringify(example));
// // {"first_name":"John","last_name":"Doe", "isbn_10": "1234567890"}
// And vise versa.

// import JSON_ from 'json_';
// const str = '{"ultimate_answer": 42}';

// console.log(JSON_.parse(str));
// // {ultimateAnswer: 42}
// Using with fetch
// You can use json_ directly with the JavaScript fetch API to convert the Response into an Object with snakeCase.

// Let's say you have a function that returns snake_case weather data, something like this.

// const fetchWeather = zip => (
//   fetch(`${weatherUrl}?zip=${zip}`)
//     .then(res => res.json())
// );

// const data = await fetchWeather('10285');
// console.log(data);
// // {current_temp: 85, reporting_station: 'New York, NY'}
// You can easily convert the resolved object to camelCase by replacing the call to Response.json() to a call to JSON_.parse(Response), like this.

// import JSON_ from 'json_';

// const fetchWeather = zip => (
//   fetch(`${weatherUrl}?zip=${zip}`)
//     .then(JSON_.parse)
// );

// const data = await fetchWeather('10285');
// console.log(data);
// // {currentTemp: 85, reportingStation: 'New York, NY'}