module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      // Ваши правила
    },
  }
  