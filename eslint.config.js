import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default [
  { languageOptions: { globals: globals.node } },
  {
    plugins: { pluginJs, pluginJest },
  },
  {
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    },
  },
  // { ignores: ["node_modules/"] },
];
