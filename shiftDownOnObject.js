const _ = require("lodash");

function shiftDown(obj, parentName) {
    _.forOwn(obj, (value, key) => {
        if (_.isObject(value)) {
            // Check if the current key matches the parentName
            if (key === parentName) {
                // Move the children to the parent's level
                _.merge(obj, value);
                delete obj[parentName]; // Delete the parent
            } else {
                // Recursively call shiftDown on the child object
                shiftDown(value, parentName);
            }
        }
    });
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

// Call shiftDown function with parent name "payments"
shiftDown(obj, "payments");

// Output the result
console.log(JSON.stringify(obj, null, 2));
