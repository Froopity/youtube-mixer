export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function isNotDefined<T>(value: T | null | undefined): value is null | undefined {
  return !isDefined(value);
}
