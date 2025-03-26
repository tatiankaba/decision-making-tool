import type { localStorageObject } from "../types/common";

export default function filterArray(
  arr: localStorageObject[],
): localStorageObject[] {
  const validArr: localStorageObject[] = arr.filter(
    ({ title, weight }: Partial<localStorageObject>) => {
      return (
        title &&
        title.length > 1 &&
        weight !== undefined &&
        parseInt(weight) > 0 &&
        !isNaN(parseInt(weight))
      );
    },
  );
  return validArr;
}
