module.exports = {
  env: {
    browser: true,
    es6: true
  },
  // https://github.com/sveltejs/eslint-plugin-svelte3
  // plugins: ['svelte3'],
  extends: ['google'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    'brace-style': ['error', 'stroustrup', {allowSingleLine: true}], // https://eslint.org/docs/rules/brace-style

    // https://eslint.org/docs/rules/comma-dangle unexpected trailing comma
    'comma-dangle': ['error', {arrays: 'only-multiline', objects: 'only-multiline', imports: 'never', exports: 'never', functions: 'never'}],

    // https://eslint.org/docs/rules/indent
    indent: ['error', 2, {MemberExpression: 0, ArrayExpression: 'first', ObjectExpression: 'first', SwitchCase: 1}],

    'arrow-parens': ['error', 'as-needed', {requireForBlockBody: true}], // https://eslint.org/docs/rules/arrow-parens always | as-needed
    'linebreak-style': ['error', 'windows'], // https://eslint.org/docs/rules/linebreak-style
    'max-len': 0, // https://eslint.org/docs/rules/max-len
    'no-invalid-this': 0, // https://eslint.org/docs/rules/no-invalid-this
    'no-unexpected-multiline': 'error', // https://eslint.org/docs/rules/no-unexpected-multiline
    'prefer-const': 0, // https://eslint.org/docs/rules/prefer-const#suggest-using-const-prefer-const
    // 'one-var': ['error', 'consecutive'], // https://eslint.org/docs/rules/one-var
    'quote-props': ['error', 'as-needed'], // https://eslint.org/docs/rules/quote-props always | as-needed | consistent | consistent-as-needed
    quotes: ['error', 'single'], // https://eslint.org/docs/rules/quotes
    'require-jsdoc': 0,
    semi: ['error', 'never'] // https://eslint.org/docs/rules/semi
  },
  // Disabling Rules Only for a Group of Files
  overrides: [
    // https://github.com/sveltejs/eslint-plugin-svelte3
    // {files: ['**/*.svelte'], processor: 'svelte3/svelte3'}
    // https://eslint.org/docs/user-guide/configuring#disabling-rules-only-for-a-group-of-files
    // {files: ['*-test.js', '*.spec.js'], rules: {'no-unused-expressions': 'off'}}
  ]
}
