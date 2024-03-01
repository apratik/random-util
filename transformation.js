// transformation.js

const _ = require('lodash');

function rename(payload, mappings) {
    const transformedPayload = {};

    for (const fromPath in mappings) {
        if (mappings.hasOwnProperty(fromPath)) {
            const toPath = mappings[fromPath];
            const value = _.get(payload, fromPath);

            // Extract the organizationId index from the "to" path if it exists
            const indexMatch = toPath.match(/\[(\d+)\]/);
            const index = indexMatch ? parseInt(indexMatch[1]) : 0;

            // Extract the parent path for organizationIds from the "to" path
            const parentPath = toPath.substring(0, toPath.indexOf('['));

            // Ensure the parent path exists in the transformed payload
            if (!_.has(transformedPayload, parentPath)) {
                // Initialize as an empty array if it doesn't exist
                _.set(transformedPayload, parentPath, []);
            }

            // Ensure the parent path is an array
            if (!Array.isArray(_.get(transformedPayload, parentPath))) {
                // If not an array, set it as an empty array
                _.set(transformedPayload, parentPath, []);
            }

            // Ensure the organizationId object exists at the specified index
            while (_.get(transformedPayload, `${parentPath}.length`, 0) <= index) {
                // Push empty objects until the array is long enough
                _.get(transformedPayload, parentPath).push({});
            }

            // Extract the field name from the "to" path
            const fieldName = toPath.split('.').pop();

            // Set the value at the specified index for the dynamically extracted field name
            _.set(transformedPayload, `${parentPath}[${index}].${fieldName}`, value);
        }
    }

    return transformedPayload;
}

module.exports = rename;
