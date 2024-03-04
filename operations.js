const _ = require('lodash');

function rename(obj, mapping) {
    _.each(mapping, (to, from) => {
        if (to.startsWith(from)) {
            const current = _.get(obj, from);
            _.unset(obj, from);
            _.set(obj, to, current);
        } else {
            _.set(obj, to, _.get(obj, from));
        }
        _.unset(obj, from);
    });
    return obj;
}

function unset(obj, removedItems) {
    _.each(removedItems, (fieldId) => {
        _.unset(obj, fieldId);
    });
    return obj;
}

function move(obj, mapping) {
    if (typeof mapping === 'object') {
        _.each(mapping, (toPath, fromPath) => {
            const value = _.get(obj, fromPath);
            _.set(obj, toPath, value);
            _.unset(obj, fromPath);
        });
    } else if (typeof mapping === 'string') {
        const toPath = Object.keys(mapping)[0];
        const fromPath = mapping[toPath];
        const value = _.get(obj, fromPath);
        _.set(obj, toPath, value);
        _.unset(obj, fromPath);
    }
    return obj;
}

module.exports = {
    rename,
    unset,
    move
};
