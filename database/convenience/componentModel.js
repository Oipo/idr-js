const _ = require('lodash');

const ComponentModel = function(attribute, keys) {
    return {
        set(value) {
            this.set(_(value).pick(keys).mapKeys(function(val, key) {
                return attribute + '_' + key;
            }).value());
        },

        get() {
            const self = this;
            return _.reduce(keys, function(result, value, key) { // for some reason the value and key are switched
                                                                 // around?
                result = result || {};
                result[key] = self.get(attribute + '_' + value);
            }, {});
        }
    };
};

module.exports = ComponentModel;
