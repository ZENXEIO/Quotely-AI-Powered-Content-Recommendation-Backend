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
      globals: {
        process: "readonly",
        console: "readonly"
      },
      ecmaVersion: "latest",
      sourceType: "module"
    }
  }
];
