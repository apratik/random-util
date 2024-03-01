const jp = require('jsonpath-plus');

function rename(obj, mapping) {
    for (const from in mapping) {
        const to = mapping[from];
        const value = jp.value(obj, from);
        jp.apply(obj, `$..${to}`, () => value);
    }
    return obj;
}
