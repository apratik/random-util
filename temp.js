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
        const current = _.get(obj, from);
        if (current !== undefined) {
            _.unset(obj, from);
            _.set(obj, to, current);
        }
    });
    return obj;
}

function unset(obj, removedItems) {
    removedItems.forEach(fieldId => {
        _.unset(obj, fieldId);
    });
    return obj;
}

function move(obj, mappings) {
    mappings.forEach(mapping => {
        const fromPath = Object.keys(mapping)[0];
        const toPath = mapping[fromPath];
        const value = _.get(obj, fromPath);
        if (value !== undefined) {
            _.set(obj, toPath, value);
            _.unset(obj, fromPath);
        }
    });
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

function modifyAddress(payload, parentPaths, operations) {
    parentPaths.forEach(parentPath => {
        const parentObjects = _.get(payload, parentPath);
        if (parentObjects) { // Check if parentObjects is not null or undefined
            if (Array.isArray(parentObjects)) {
                // If parentObjects is an array, iterate over each element
                parentObjects.forEach(parentObject => {
                    // Check if parentObject is not null or undefined
                    if (parentObject) {
                        // Iterate over each property of the parentObject
                        Object.keys(parentObject).forEach(property => {
                            const propertyValue = parentObject[property];
                            if (Array.isArray(propertyValue)) {
                                // If the property value is an array, iterate over each element
                                propertyValue.forEach(element => {
                                    performOperations(element, operations);
                                });
                            }
                        });
                    }
                });
            } else {
                // If parentObjects is not an array
                // Iterate over each property of the parentObject
                Object.keys(parentObjects).forEach(property => {
                    const propertyValue = parentObjects[property];
                    if (Array.isArray(propertyValue)) {
                        // If the property value is an array, iterate over each element
                        propertyValue.forEach(element => {
                            performOperations(element, operations);
                        });
                    }
                });
            }
        }
    });
}


function performOperations(obj, operations) {
    if (operations.rename) {
        rename(obj, operations.rename);
    }
    if (operations.unset) {
        unset(obj, operations.unset);
    }
    if (operations.move) {
        move(obj, operations.move);
    }
}

-----

const jsonpath = require('jsonpath');

function modifyAddress(payload, parentPaths, operations) {
    parentPaths.forEach(parentPath => {
        const parentObjects = jsonpath.query(payload, parentPath);
        if (parentObjects && parentObjects.length > 0) {
            parentObjects.forEach(parentObject => {
                performOperations(parentObject, operations);
            });
        }
    });
}

------

-----

const jsonpath = require('jsonpath');

function move(payload, mappings) {
    mappings.forEach(mapping => {
        const fromPath = Object.keys(mapping)[0];
        const toPath = mapping[fromPath];
        
        const sourceObjects = jsonpath.query(payload, `$${fromPath}`);
        
        // Add the source objects to the destination
        jsonpath.apply(payload, `$${toPath}`, (destinationObjects) => {
            destinationObjects.push(...sourceObjects);
            return destinationObjects;
        });

        // Remove the source objects from the payload
        jsonpath.apply(payload, `$${fromPath}`, (obj) => {
            // Remove the object from the array
            return obj.filter(item => !sourceObjects.includes(item));
        });
    });
    return payload;
}

module.exports = {
    move,
};


-----

    

    


module.exports = {
    rename,
    unset,
    move,
    convertToMinor,
    modifyAddress,
};
