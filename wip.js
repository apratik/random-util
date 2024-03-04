const { rename, unset, move } = require('./funcs');

module.exports = {
    upgrade: function(payload) {
        rename(payload, {
            "user.name.first": "user.first_name",
            "user.name.last": "user.last_name"
        });

        unset(payload, ["user.dob", "user.city"]);

        // Perform the move operation here
        move("user.name", "customer.personal_info.name", payload);
    },

    downgrade: function(payload) {
        unset(payload, ["user.dob", "user.city"]);

        // Perform the move operation here
        move("customer.personal_info.name", "user.name", payload);
    }
};
