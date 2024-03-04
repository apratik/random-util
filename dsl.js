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
    },

    downgrade(payload) {
        unset(payload, ["user.dob", "user.city"]);

        move(payload, {
            "customer.personal_info.name": "user.name"
        });
    }
};
