import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable strict quote/apostrophe escaping rule
      "react/no-unescaped-entities": "off",
      // Disable image optimization warnings (change to warn instead of error)
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
