const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{ts,d.ts}"],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        module: "writable",
        require: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        test: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",

      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "interface", format: ["PascalCase"] },
        { selector: "typeAlias", format: ["PascalCase"] },
        { selector: "enum", format: ["PascalCase"] },
      ],

      "@typescript-eslint/prefer-as-const": "error",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",
    },
  },
  {
    ignores: ["dist/", "node_modules/", "*.js"],
  },
];