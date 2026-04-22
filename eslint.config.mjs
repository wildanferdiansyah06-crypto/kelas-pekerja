import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-props-no-spreading": "off",
      "react/forbid-prop-types": "off",
      "react/jsx-no-bind": "off",
      "react/no-children-prop": "off",
      "react/jsx-key": "off",
    },
  },
  {
    ignores: ["**/*.d.ts", "**/node_modules/**", "**/.next/**", "**/dist/**"],
  },
];
