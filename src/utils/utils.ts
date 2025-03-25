export function isJSONValid(data: unknown): boolean {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(
    (obj) =>
      typeof obj === "object" &&
      obj !== null &&
      Object.prototype.hasOwnProperty.call(obj, "id") &&
      Object.prototype.hasOwnProperty.call(obj, "title") &&
      Object.prototype.hasOwnProperty.call(obj, "weight"),
  );
}
