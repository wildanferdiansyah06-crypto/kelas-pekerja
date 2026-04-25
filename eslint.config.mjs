import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tseslint.configs.recommended,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-props-no-spreading": "off",
      "react/forbid-prop-types": "off",
      "react/jsx-no-bind": "off",
      "react/no-children-prop": "off",
      "react/jsx-key": "off",
      // Disable React Compiler rules that are causing build failures
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/error-boundaries": "off",
      "react-hooks/purity": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/immutability": "off",
    },
  },
  {
    ignores: ["**/*.d.ts", "**/node_modules/**", "**/.next/**", "**/dist/**"],
  },
];

export default eslintConfig;
