const fs = require('fs');
const _ = require('lodash');
const jp = require('jsonpath');

// Load the currency configuration from a JSON file
const currencyConfig = {};
const currencyData = JSON.parse(fs.readFileSync('currency_config.json'));
currencyData.forEach(currency => {
    currencyConfig[currency.Code] = Math.pow(10, parseInt(currency.Decimals));
});

// Function to convert an amount to minor units based on the currency
function convert(type, value, currency) {
    if (type === 'amount_minor_units') {
        // Get the minor unit multiplier for the given currency
        const multiplier = currencyConfig[currency];
        if (!multiplier) {
            throw new Error(`No currency configuration found for currency code ${currency}`);
        }
        // Convert the amount to minor units
        return parseFloat(value.replace(/[^0-9.-]+/g, '')) * multiplier;
    } else {
        return value; // Return value unchanged for other types
    }
}

// Example JSON object with currency field
const jsonObject = {
    "user": {
        "name": "John",
        "age": "25",
        "balance": "$100.50",
        "currency": "USD", // Currency code
        "registrationDate": "2024-02-29T10:30:45Z",
        "registrationTime": "2024-02-29T10:30:45Z"
    }
};

// Example conversion paths
const conversionPaths = [
    { path: 'user.name', type: 'string' },
    { path: 'user.age', type: 'number' },
    { path: 'user.balance', type: 'amount_minor_units', currencyPath: '$.user.currency' }, // Include currencyPath for amount conversion
    { path: 'user.registrationDate', type: 'date' },
    { path: 'user.registrationTime', type: 'time' }
];

// Function to extract currency from JSON object using JSON path
function getCurrencyFromPath(obj, currencyPath) {
    const currencyValue = jp.value(obj, currencyPath);
    if (!currencyValue) {
        throw new Error(`Currency value not found at path: ${currencyPath}`);
    }
    return currencyValue;
}

// Function to apply conversions at specified paths in the object
function convertAtPath(obj, paths) {
    paths.forEach(pathInfo => {
        const { path, type, currencyPath } = pathInfo;
        const value = _.get(obj, path);
        const currency = getCurrencyFromPath(obj, currencyPath);
        _.set(obj, path, convert(type, value, currency));
    });
    return obj;
}

// Convert paths in the JSON object using the currency
const convertedObject = convertAtPath(jsonObject, conversionPaths);
console.log(convertedObject);
