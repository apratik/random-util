const jsonpath = require('jsonpath');

function move(payload, mappings) {
    mappings.forEach(mapping => {
        const fromPath = Object.keys(mapping)[0];
        const toPath = mapping[fromPath];

        const sourceValues = jsonpath.query(payload, `$.${fromPath}`);

        if (!sourceValues || !sourceValues.length) return; // Skip if source values are empty or undefined

        if (sourceValues.length === 1 && typeof sourceValues[0] === 'object' && !Array.isArray(sourceValues[0])) {
            // If there's only one object in sourceValues and it's not an array, assign it directly
            jsonpath.value(payload, `$.${toPath}`, sourceValues[0]);
        } else {
            // If there are multiple objects or a single array object, assign it as an array
            jsonpath.value(payload, `$.${toPath}`, sourceValues);
        }

        // Remove the source path
        jsonpath.value(payload, `$.${fromPath}`, undefined);
    });

    return payload;
}

module.exports = {
    move,
};
