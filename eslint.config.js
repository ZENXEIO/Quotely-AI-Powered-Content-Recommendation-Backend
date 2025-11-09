export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": ["error", "always"],
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "curly": ["error", "all"],
      "prefer-const": "error"
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  }
];
