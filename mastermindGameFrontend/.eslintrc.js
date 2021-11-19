module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.eslint.json"
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "rules": {
    "@typescript-eslint/quotes": [
      "error",
      "single"
    ],
    "@typescript-eslint/unbound-method": [
      "error",
      {
        "ignoreStatic": true
      }
    ],
    "@typescript-eslint/restrict-template-expressions": "off",

    // note you must disable the base rule as it can report incorrect errors
    "semi": "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }]

    // "@typescript-eslint/rule-name": "error",
    // "@typescript-eslint/adjacent-overload-signatures": "error",
    // "@typescript-eslint/array-type": "off",
    // "@typescript-eslint/ban-types": [
    //   "error",
    //   {
    //     "types": {
    //       "Object": {
    //         "message": "Avoid using the `Object` type. Did you mean `object`?"
    //       },
    //       "Function": {
    //         "message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
    //       },
    //       "Boolean": {
    //         "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
    //       },
    //       "Number": {
    //         "message": "Avoid using the `Number` type. Did you mean `number`?"
    //       },
    //       "String": {
    //         "message": "Avoid using the `String` type. Did you mean `string`?"
    //       },
    //       "Symbol": {
    //         "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
    //       }
    //     }
    //   }
    // ],
    // "@typescript-eslint/class-name-casing": "error",
    // "@typescript-eslint/consistent-type-assertions": "error",
    // "@typescript-eslint/explicit-member-accessibility": [
    //   "off",
    //   {
    //     "accessibility": "explicit"
    //   }
    // ],
    // "@typescript-eslint/interface-name-prefix": "off",
    // "@typescript-eslint/member-ordering": "error",
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/no-empty-interface": "error",
    // "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/no-inferrable-types": "error",
    // "@typescript-eslint/no-misused-new": "error",
    // "@typescript-eslint/no-namespace": "error",
    // "@typescript-eslint/no-non-null-assertion": "error",
    // "@typescript-eslint/no-parameter-properties": "off",
    // "@typescript-eslint/no-use-before-define": "error",
    // "@typescript-eslint/no-var-requires": "off",
    // "@typescript-eslint/prefer-for-of": "error",
    // "@typescript-eslint/prefer-function-type": "error",
    // "@typescript-eslint/prefer-namespace-keyword": "error",
    // "@typescript-eslint/triple-slash-reference": "error",
    // "@typescript-eslint/unified-signatures": "error",
    // "arrow-parens": [
    //   "off",
    //   "always"
    // ],
    // "comma-dangle": "off",
    // "complexity": "off",
    // "constructor-super": "error",
    // "dot-notation": "error",
    // "eqeqeq": [
    //   "error",
    //   "smart"
    // ],
    // "guard-for-in": "error",
    // "id-blacklist": [
    //   "error",
    //   "any",
    //   "Number",
    //   "number",
    //   "String",
    //   "string",
    //   "Boolean",
    //   "boolean",
    //   "Undefined",
    //   "undefined"
    // ],
    // "id-match": "error",
    // "import/no-deprecated": "warn",
    // "import/order": "off",
    // "jsdoc/check-alignment": "error",
    // "jsdoc/check-indentation": "error",
    // "jsdoc/newline-after-description": "error",
    // "jsdoc/no-types": "error",
    // "max-classes-per-file": "off",
    // "max-len": [
    //   "error",
    //   {
    //     "code": 140
    //   }
    // ],
    // "new-parens": "error",
    // "no-bitwise": "error",
    // "no-caller": "error",
    // "no-cond-assign": "error",
    // "no-console": [
    //   "error",
    //   {
    //     "allow": [
    //       "log",
    //       "warn",
    //       "dir",
    //       "timeLog",
    //       "assert",
    //       "clear",
    //       "count",
    //       "countReset",
    //       "group",
    //       "groupEnd",
    //       "table",
    //       "dirxml",
    //       "error",
    //       "groupCollapsed",
    //       "Console",
    //       "profile",
    //       "profileEnd",
    //       "timeStamp",
    //       "context"
    //     ]
    //   }
    // ],
    // "no-debugger": "error",
    // "no-empty": "off",
    // "no-eval": "error",
    // "no-fallthrough": "error",
    // "no-invalid-this": "off",
    // "no-multiple-empty-lines": "off",
    // "no-new-wrappers": "error",
    // "no-restricted-imports": [
    //   "error",
    //   "rxjs/Rx"
    // ],
    // "no-shadow": [
    //   "error",
    //   {
    //     "hoist": "all"
    //   }
    // ],
    // "no-throw-literal": "error",
    // "no-trailing-spaces": "error",
    // "no-undef-init": "error",
    // "no-underscore-dangle": "error",
    // "no-unsafe-finally": "error",
    // "no-unused-expressions": "error",
    // "no-unused-labels": "error",
    // "no-var": "error",
    // "object-shorthand": "error",
    // "one-var": [
    //   "error",
    //   "never"
    // ],
    // "prefer-arrow/prefer-arrow-functions": "error",
    // "prefer-const": "error",
    // "quote-props": [
    //   "error",
    //   "as-needed"
    // ],
    // "radix": "error",
    // "spaced-comment": "error",
    // "use-isnan": "error",
    // "valid-typeof": "off",
    // "@typescript-eslint/tslint/config": [
    //   "error",
    //   {
    //     "rules": {
    //       "component-class-suffix": true,
    //       "component-selector": [
    //         true,
    //         "element",
    //         "app",
    //         "kebab-case"
    //       ],
    //       "contextual-lifecycle": true,
    //       "directive-class-suffix": true,
    //       "directive-selector": [
    //         true,
    //         "attribute",
    //         "app",
    //         "camelCase"
    //       ],
    //       "no-conflicting-lifecycle": true,
    //       "no-host-metadata-property": true,
    //       "no-input-rename": true,
    //       "no-inputs-metadata-property": true,
    //       "no-output-native": true,
    //       "no-output-on-prefix": true,
    //       "no-output-rename": true,
    //       "no-outputs-metadata-property": true,
    //       "template-banana-in-box": true,
    //       "template-no-negated-async": true,
    //       "use-lifecycle-interface": true,
    //       "use-pipe-transform-interface": true
    //     }
    //   }
    // ]
  }
};