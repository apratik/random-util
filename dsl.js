// dsl.js

module.exports = {
    upgrade(payload) {
        rename(payload, {
            "user.name.first": "user.first_name",
            "user.name.last": "user.last_name"
        });

        unset(payload, ["user.dob", "user.city"]);

        move(payload, {
            "user.name": "customer.personal_info.name"
        });

        modifyAddress(payload, ["creditor.address", "debtor.address"], {
            rename: {
                "city": "cityName"
            },
            move: {
                "city": "payments.creditor.address.cityName",
                "postalCode": "payments.postalAddress.postalCode"
            },
            unset: ["country"]
        });
    },

    downgrade(payload) {
        unset(payload, ["user.dob", "user.city"]);

        move(payload, {
            "customer.personal_info.name": "user.name"
        });
    }
};
