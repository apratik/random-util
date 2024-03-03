const _ = require("lodash");

function shiftDown(obj, jsonPath) {
    const keys = jsonPath.split('.');
    let currentObj = obj;

    // Traverse the object until reaching the parent of the specified path
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (_.isObject(currentObj[key])) {
            currentObj = currentObj[key];
        } else {
            console.log("Invalid JSON path.");
            return;
        }
    }

    // Get the key for the last element in the path
    const lastKey = keys[keys.length - 1];

    // Check if the last key exists in the current object
    if (_.has(currentObj, lastKey)) {
        // Move the specified property to the parent's level
        const value = _.get(currentObj, lastKey);
        delete currentObj[lastKey]; // Delete the property at its original location

        // Set the property at the desired location
        _.set(obj, `debtor.partyIdentifiers.${lastKey}`, value);
    } else {
        console.log("JSON path not found in the object.");
    }
}

// Test object
let obj = {
    payments: {
        debtor: {
            partyIdentifiers: {
                id: "123456789",
                bic: "testbic",
                date: "2019-01-01"
            }
        },
        other: {
            partyIdentifiers: {
                id: "987654321",
                bic: "testbic",
                date: "2019-01-02"
            }
        }
    },
    creditor: {
        partyIdentifiers: {
            id: "9876xxxx54321",
            bic: "testbiaac",
            date: "2019-01xxx-02"
        }
    }
};

// Call shiftDown function with JSON path "payments.debtor.partyIdentifiers.id"
shiftDown(obj, "payments.debtor.partyIdentifiers.id");

// Output the result
console.log(JSON.stringify(obj, null, 2));
