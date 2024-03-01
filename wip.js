// dsl.js

const _ = require("lodash");

function shiftup(payload, from, to) {
    const value = _.get(payload, from);
    _.unset(payload, from);
    _.set(payload, to, { ...value });
    return payload;
}

function shiftdown(payload, levelToRemove) {
    const value = _.get(payload, levelToRemove);
    _.unset(payload, levelToRemove);
    _.merge(payload, value); // Merge the contents of the removed level into the payload
    return payload;
}

function rename(payload, mappings) {
    Object.entries(mappings).forEach(([from, to]) => {
        const value = _.get(payload, from);
        _.unset(payload, from);
        _.set(payload, to, value);
    });
    return payload;
}

function unset(payload, fields) {
    fields.forEach(field => {
        _.unset(payload, field);
    });
    return payload;
}

module.exports = {
    shiftup,
    shiftdown,
    rename,
    unset
};




----


    // dsl.js

const _ = require("lodash");

function shiftup(payload, from, to) {
    const value = _.get(payload, from);
    _.unset(payload, from);
    _.set(payload, to, { ...value });
    return payload;
}

function shiftdown(payload, levelToRemove) {
    const value = _.get(payload, levelToRemove);
    _.unset(payload, levelToRemove);
    _.merge(payload, value); // Merge the contents of the removed level into the payload
    return payload;
}

function rename(payload, mappings) {
    Object.entries(mappings).forEach(([from, to]) => {
        const value = _.get(payload, from);
        _.unset(payload, from);
        _.set(payload, to, value);
    });
    return payload;
}

function unset(payload, fields) {
    fields.forEach(field => {
        _.unset(payload, field);
    });
    return payload;
}

module.exports = {
    shiftup,
    shiftdown,
    rename,
    unset
};
