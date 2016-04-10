const _ = require('lodash');

const ComponentModel = function(attribute, keys) {
    return {
        set(value) {
            this.set(_(value).pick(keys).mapKeys((val, key) =>
                 `${attribute}_${key}`
            ).value());
        },

        get() {
            return _.reduce(keys, (result, value, key) => {
                result = result || {};
                result[key] = this.get(attribute + '_' + value);
                return result;
            }, {});
        }
    };
};

module.exports = ComponentModel;
