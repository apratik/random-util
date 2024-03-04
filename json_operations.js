const _ = require('lodash');

function move(sourcePath, destinationPath, obj) {
    const value = _.get(obj, sourcePath); // Get the value from the source path
    _.unset(obj, sourcePath); // Remove the value from the source path
    _.set(obj, destinationPath, value); // Set the value to the destination path
    return obj;
}

module.exports = {
    move
};
