module.exports = {
    "extends": "kellyirc",
    "plugins": [
        "standard"
    ],
    "parserOptions": {
      "ecmaVersion": 6,
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
      },
      "sourceType": "module"
    },
    "env": {
      "es6": true,
      "node": true
    },
    "rules": {
      "constructor-super": 2,
      "no-this-before-super": 2,
      "no-var": 2,
      "object-shorthand": [2, "always"],
      "prefer-const": 2,
      "max-len": ["error", 120, 4]
    }
};
