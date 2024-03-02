const _ = require("lodash");

function shiftDown(obj, jsonPath) {
    const keys = jsonPath.split('.');
    const lastKey = keys.pop(); // Remove the last key
    let currentObj = obj;

    // Traverse the object until reaching the parent of the specified path
    for (const key of keys) {
        if (_.isObject(currentObj[key])) {
            currentObj = currentObj[key];
        } else {
            console.log("Invalid JSON path.");
            return;
        }
    }

    // Check if the last key exists in the current object
    if (_.has(currentObj, lastKey)) {
        // Move the specified property to the root level
        const value = _.get(currentObj, lastKey);
        _.set(obj, `debtor.partyIdentifiers.${lastKey}`, value); // Set the property at the desired location
        delete currentObj[lastKey]; // Delete the property from its previous location
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
