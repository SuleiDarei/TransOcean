import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

// eslint-config-next 15 ships a legacy (eslintrc) config; FlatCompat adapts it.
const compat = new FlatCompat({ baseDirectory: path.dirname(fileURLToPath(import.meta.url)) });

export default defineConfig([
  globalIgnores([".next/", "out/", "node_modules/", "next-env.d.ts"]),
  ...compat.extends("next/core-web-vitals"),
]);
