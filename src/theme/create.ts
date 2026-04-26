import { defaultTheme } from "./defaults";
import type { ThemeConfig, ThemeOverrides } from "./types";

/**
 * Deep merges two objects. Arrays and primitives in `override` replace those in
 * `base` — only plain objects are recursed into. This is intentional: a consumer
 * overriding `button.intent.primary` replaces that intent entirely rather than
 * partially patching individual state keys, which would leave the config in an
 * inconsistent half-overridden state.
 */
function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result = { ...base };

  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (
      overrideVal !== null &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      );
    } else {
      (result as Record<string, unknown>)[key] = overrideVal;
    }
  }

  return result;
}

/**
 * Creates a theme by merging overrides on top of the default theme.
 * Only specify what differs — everything else falls back to the default.
 *
 * @example
 * const theme = createTheme({
 *   components: {
 *     button: {
 *       ripple: false,
 *       intent: {
 *         primary: {
 *           default: { bg: "bg-violet-600", text: "text-white", border: "border-transparent", shadow: "shadow-sm" },
 *           // hover, pressed, focusVisible, disabled, loading inherit from default theme
 *         },
 *       },
 *     },
 *   },
 * })
 */
export function createTheme(overrides: ThemeOverrides = {}): ThemeConfig {
  return deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>,
  ) as ThemeConfig;
}
