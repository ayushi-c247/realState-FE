import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      // Turn off any conflicting built‑in rules
      "sort-imports": "off",
      "import/order": "off",

      // Enforce & auto‑fix import groups + ordering
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    ignores: [
      "**/node_modules/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "**/dist/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "**/build/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "public/**/*.{js,mjs,cjs,ts,jsx,tsx}",
    ],
  },
]);
