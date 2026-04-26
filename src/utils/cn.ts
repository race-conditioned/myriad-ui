/**
 * Merges class names, filtering out falsy values.
 * Intentionally lightweight — no Tailwind merge logic needed since component
 * configs are defined by the consumer and class conflicts are their responsibility.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
