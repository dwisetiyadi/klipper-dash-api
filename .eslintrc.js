module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    'plugin:@typescript-eslint/recommended',
  ],
  "parserOptions":  {
    "ecmaVersion":  2018,  // Allows for the parsing of modern ECMAScript features
    "sourceType":  "module",  // Allows for the use of imports
  },
  "rules": {
    "camelcase" : 1,
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "semi": 2,
    "react/jsx-wrap-multilines": 0,
    "react/jsx-filename-extension": 0,
    "no-use-before-define": 0,
    "max-len": ["error", { "code": 150, "tabWidth": 2 }],
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "comma-dangle": ["error", "always-multiline"],
    "operator-linebreak": "off",
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/allowSyntheticDefaultImports": true,
  },
};
