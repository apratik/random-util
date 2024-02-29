function rename(obj, mapping) {
    _.each(mapping, (to, from) => {
        if (to.startsWith(from)) {
            const current = _.get(obj, from);
            _.unset(obj, from);
            _.set(obj, to, current);
            return;
        }

        const fromPath = from.split('.');
        const current = _.get(obj, fromPath.join('.'));
        if (_.isArray(current)) {
            const arrayValues = current.map((value, index) => {
                const toPath = to.replace('[x]', `[${index}]`);
                if (_.isObject(value)) {
                    return rename(value, _.mapKeys(mapping, (value, key) => key.replace(fromPath.join('.'), toPath)));
                }
                return value;
            });
            _.unset(obj, fromPath.join('.'));
            const parentPath = to.substring(0, to.lastIndexOf('[x]')); // Get the parent path directly from 'to' where [x] is present
            _.set(obj, parentPath, arrayValues); // Set array with dynamically determined parent path
        } else if (_.isObject(current)) {
            _.each(current, (value, key) => {
                const toPath = to.replace('[x]', `[${key}]`);
                _.set(obj, toPath, value);
            });
            _.unset(obj, fromPath.join('.'));
        } else {
            // Check if the 'to' path contains [x] and create an array with correct structure
            if (/\[x\]/.test(to)) {
                const parentPath = to.substring(0, to.lastIndexOf('[x]')); // Get the parent path directly from 'to' where [x] is present
                const arrayValue = _.get(obj, parentPath, []);
                const newItem = { [to.substring(to.lastIndexOf('.') + 1)]: current }; // Use the field name directly from 'to' where [x] is present
                arrayValue.push(newItem);
                _.set(obj, parentPath, arrayValue);
            } else {
                _.set(obj, to, current);
            }
            _.unset(obj, fromPath.join('.'));
        }
    });
    return obj;
}
