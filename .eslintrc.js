module.exports = {
    'env': {
        'browser': true,
        'jest': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'airbnb',
    ],
    'rules': {
        "class-methods-use-this": 0,
        "no-unused-expressions": 0,
        "react/no-array-index-key":0,
        "react/jsx-indent": ["warn", 4],
        "react/no-did-update-set-state": 0,
        "linebreak-style": ["error", "unix"],
        "indent": ["error", 4],
        "max-len": 0,
        "no-nested-ternary": 0,
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/label-has-for":"off",
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        }
    }
};