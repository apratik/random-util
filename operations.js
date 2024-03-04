const _ = require('lodash');

// Global mapping of currency codes to the number of decimal places
const currencyDecimals = {
    "USD": 2,
    "JPY": 0,
    "GBP": 2,
    "BHD": 3
};

function rename(obj, mapping) {
    _.each(mapping, (to, from) => {
        if (to.startsWith(from)) {
            const current = _.get(obj, from);
            _.unset(obj, from);
            _.set(obj, to, current);
        } else {
            _.set(obj, to, _.get(obj, from));
        }
        _.unset(obj, from);
    });
    return obj;
}

function unset(obj, removedItems) {
    _.each(removedItems, (fieldId) => {
        _.unset(obj, fieldId);
    });
    return obj;
}

function move(fromPath, toPath, obj) {
    const value = _.get(obj, fromPath);
    _.set(obj, toPath, value);
    _.unset(obj, fromPath);
    return obj;
}

function convertToMinor(obj, currencyType, paths) {
    const decimals = currencyDecimals[currencyType];
    if (decimals === undefined) {
        throw new Error(`No decimal places found for currency code ${currencyType}`);
    }

    paths.forEach(path => {
        const amount = _.get(obj, path);
        if (!isNaN(amount)) {
            _.set(obj, path, amount * Math.pow(10, decimals));
        }
    });

    return obj;
}

module.exports = {
    rename,
    unset,
    move,
    convertToMinor
};
