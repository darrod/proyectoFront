import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    name: "aurora-travels/react-hooks",
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules
    }
  },
  {
    name: "aurora-travels/accessibility",
    plugins: { "jsx-a11y": jsxA11y },
    rules: {
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn"
    }
  },
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"]
      }
    },
    rules: {
      "react/prop-types": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    files: ["**/*.{ts,tsx}"]
  }
);

