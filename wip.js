function rename(obj, mapping) {
    _.each(mapping, (to, from) => {
        const fromPath = from.split('.');
        const current = _.get(obj, fromPath.join('.'));
        
        if (_.isArray(current)) {
            const arrayValues = current.map((value, index) => {
                const toPath = to.replace('[x]', `[${index}]`);
                if (_.isObject(value)) {
                    rename(value, _.mapKeys(mapping, (value, key) => key.replace(fromPath.join('.'), toPath)));
                } else {
                    return value;
                }
            });
            if (!_.get(obj, to)) {
                _.set(obj, to, []);
            }
            _.get(obj, to).push(...arrayValues.filter(value => value !== undefined));
            _.unset(obj, fromPath.join('.'));
        } else if (_.isObject(current)) {
            _.each(current, (value, key) => {
                const toPath = to.replace('[x]', `[${key}]`);
                _.set(obj, toPath, value);
            });
            _.unset(obj, fromPath.join('.'));
        } else {
            _.set(obj, to, current);
            _.unset(obj, fromPath.join('.'));
        }
    });
    return obj;
}
