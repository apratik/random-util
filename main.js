// main.js

const rename = require("./transformation");

let payload = {
    payments: {
        debtor: {
            partyIdentifiers: {
                organizationId: {
                    id: "123456789",
                    bic: "testbic",
                    date:  "2019-01-01"
                }
            }
        }
    }
};

const mappings = {
    "payments.debtor.partyIdentifiers.organizationId.id": "debtor.partyDetails.organizationIds[*].organizationId",
    "payments.debtor.partyIdentifiers.organizationId.bic": "debtor.partyDetails.organizationIds[*].bic",
    "payments.debtor.partyIdentifiers.organizationId.date": "debtor.partyDetails.organizationIds[*].date"

};

const transformedPayload = rename(payload, mappings);

console.log(JSON.stringify(transformedPayload, null, 2));

