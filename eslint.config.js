import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]), // Bỏ qua thư mục build

  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"], // Sử dụng bộ quy tắc mới nhất cho React Hooks
      reactRefresh.configs.vite, // Bao gồm các quy tắc cần thiết cho React Refresh với Vite
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    rules: {
      // Cho phép các biến không sử dụng là PascalCase (components) hoặc có tên là 'motion'
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]|motion$" }],

      // Tắt kiểm tra prop-types, thường được xử lý bởi TypeScript hoặc không cần thiết
      "react/prop-types": "off",
    },
  },
]);