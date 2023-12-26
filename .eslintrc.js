module.exports = {
  env: {
    node: true,
    es2021: true,
    es6: true,
    jest: true,
    browser: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
        'browser': 'readonly',
        'driver': 'readonly',
        '$': 'readonly',
        '$$': 'readonly',
        'page': 'readonly'
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'consistent-return': 'error',
    'no-multi-spaces': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 0 }],
    'import': 'off',
    'no-await-in-loop': 'off',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': ['error', {
      'patterns': ['src/*']
    }],
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'eol-last': ['error', 'always'],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }]
  },
  ignorePatterns: ['dist/'],
};
