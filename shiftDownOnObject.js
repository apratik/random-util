const _ = require('lodash');

function shiftDown(obj, parentName) {
    const payments = obj[parentName]; // Obtain the "payments" object
    delete obj[parentName]; // Delete the "payments" key
  
    for (const [key, value] of Object.entries(payments)) {
      // Create a unique key if needed (handle potential collisions)
      let uniqueKey = key;
      let counter = 1;
      while (obj.hasOwnProperty(uniqueKey)) {
        uniqueKey = `${key}_${counter}`;
        counter++;
      }
  
      obj[uniqueKey] = value; // Assign property to original object
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
    others: {
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
shiftDown(obj, "creditor");
console.log(JSON.stringify(obj, null, 2)); // Output the final structured object
  
