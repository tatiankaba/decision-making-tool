import type { localStorageObject } from "../types/common";

export default function filterArray(
  array: localStorageObject[],
): localStorageObject[] {
  const validArray: localStorageObject[] = array.filter(
    ({ title, weight }: Partial<localStorageObject>) => {
      return (
        title &&
        title.length > 1 &&
        weight !== undefined &&
        Number.parseInt(weight) > 0 &&
        !Number.isNaN(Number.parseInt(weight))
      );
    },
  );
  return validArray;
}
