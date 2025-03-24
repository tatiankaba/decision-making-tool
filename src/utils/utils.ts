export function isJSONValid(data: unknown): boolean {
  console.log("Проверяем JSON:", data);
  if (!Array.isArray(data)) {
    console.log("до этой проверки доходит");
    return false;
  }
  console.log("data — массив, начинаем проверку каждого объекта");

  return data.every(
    (obj) =>
      typeof obj === "object" &&
      obj !== null &&
      Object.prototype.hasOwnProperty.call(obj, "id") &&
      Object.prototype.hasOwnProperty.call(obj, "title") &&
      Object.prototype.hasOwnProperty.call(obj, "weight"),
  );
}
