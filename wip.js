const jp = require('jsonpath-plus');

function rename(obj, mapping) {
    Object.entries(mapping).forEach(([from, to]) => {
        const value = jp.value(obj, from);
        jp.value(obj, to, value);
        jp.apply(obj, `$..${from}`, () => jp.value(obj, to));
    });
    return obj;
}
