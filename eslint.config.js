const js = require("@eslint/js");
const globals = require("globals");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const { defineConfig } = require("eslint/config");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  // Global ignores for the entire monorepo
  {
    ignores: ["dist", "client/dist"],
  },

  // Base configuration for all JavaScript files
  js.configs.recommended,
  // Apply prettier rules to disable conflicting ESLint rules.
  // This should generally be the last configuration in the array.
  prettierConfig,

  // Client-specific configuration (React + Vite)
  {
    files: ["client/src/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Rules from eslint-plugin-react-hooks
      ...reactHooks.configs.recommended.rules,
      // Rule from eslint-plugin-react-refresh for Vite HMR
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Add any other client-specific rules here
    },
  },

  // Server-specific configuration (Node.js)
  {
    files: ["server/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "script", // Use 'script' for CommonJS modules in Node.js
      },
    },
    rules: {
      // Add any server-specific rules here
      // Example: enforce modern JS features for server
      "no-var": "error",
      "prefer-const": "error",
    },
  },
]);
