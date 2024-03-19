import currentThing from "eslint-config-current-thing";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import pathMark from "./dist/index.js"

export default [
  ...currentThing(),
  {
    plugins: {
      "eslint-plugin":  eslintPlugin
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules
    }
  },
  pathMark.configs.flat,
];
