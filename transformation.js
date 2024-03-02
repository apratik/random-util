const _ = require("lodash");

function rename(obj, mapping) {
    _.each(mapping, (to, from) => {
        if (to.startsWith(from)) {
            const current = _.get(obj, from);
            _.unset(obj, from);
            _.set(obj, to, current);
            return;
        }
        _.set(obj, to, _.get(obj, from));
        _.unset(obj, from);
    });
    return obj;
}

function shiftUp(obj, parentName) {
    _.forOwn(obj, (value, key) => {
        if (key === parentName) {
            const parent = obj[key];
            delete obj[key];
            obj[parentName + "_1"] = parent;
            return false; // Stop iteration
        } else if (_.isObject(value)) {
            shiftUp(value, parentName);
        }
    });
}

function shiftDown(obj, parentName) {
    let found = false;
    _.forOwn(obj, (value, key) => {
        if (found) return false; // Stop iteration if parent has been found
        if (key === parentName) {
            const parent = obj[key];
            delete obj[key];
            obj[parentName + "_1"] = parent;
            found = true;
        } else if (_.isObject(value)) {
            shiftDown(value, parentName);
        }
    });
}

module.exports = { rename, shiftUp, shiftDown };
