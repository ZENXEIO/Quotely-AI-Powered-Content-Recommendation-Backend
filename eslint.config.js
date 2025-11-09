export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {
      // Basic good practices
      eqeqeq: "warn",
      "prefer-const": "warn",
      curly: "warn",

      // Style preferences
      semi: ["warn", "always"],
      quotes: ["warn", "double"],

      // Developer convenience
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
    },
  },
];
