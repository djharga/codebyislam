module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // قواعد عامة
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'warn',
    'no-console': 'warn',

    // قواعد JavaScript
    'prefer-const': 'error',
    'no-var': 'error',
    'arrow-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',

    // قواعد خاصة بالمشروع
    'max-len': ['warn', { 'code': 120 }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2 }],
  },
  globals: {
    // متغيرات عامة في المتصفح
    'document': 'readonly',
    'window': 'readonly',
    'console': 'readonly',
    'localStorage': 'readonly',
    'sessionStorage': 'readonly',
  },
};
