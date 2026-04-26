import { defineConfig } from "tsup";

export default defineConfig({
  // Each component directory becomes its own entry point.
  // Adding a new component = adding one line here + one export in package.json.
  entry: {
    index:             "src/index.ts",
    theme:             "src/theme/index.ts",
    button:            "src/button/index.ts",
    checkbox:          "src/checkbox/index.ts",
    "glow-border-button": "src/glow-border-button/index.ts",
    "rolling-text":       "src/rolling-text/index.ts",
    tooltip:              "src/tooltip/index.ts",
    "text-field":         "src/text-field/index.ts",
    "text-area":          "src/text-area/index.ts",
    "number-field":       "src/number-field/index.ts",
    "combo-box":          "src/combo-box/index.ts",
    "search-field":       "src/search-field/index.ts",
    "select-field":       "src/select-field/index.ts",
    "radio-group":        "src/radio-group/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  // Consumers bring their own React and React Aria — don't bundle them.
  external: ["react", "react-dom", "react-aria-components"],
  // Preserve the directory structure so bundlers can tree-shake per component.
  splitting: true,
  sourcemap: true,
});
