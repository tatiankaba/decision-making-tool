export function isJSONValid(data: unknown): boolean {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(
    (object) =>
      typeof object === "object" &&
      object !== null &&
      Object.prototype.hasOwnProperty.call(object, "id") &&
      Object.prototype.hasOwnProperty.call(object, "title") &&
      Object.prototype.hasOwnProperty.call(object, "weight"),
  );
}
