import type { localStorageObject } from "../types/common";

export default function areOptionsCorrect(): boolean {
  const options = localStorage.getItem("options");
  if (options) {
    const arr: localStorageObject[] = JSON.parse(options);
    const validArr = arr.filter(({ title, weight }) => {
      return (
        title &&
        title.length > 1 &&
        weight !== undefined &&
        parseInt(weight) > 0 &&
        !isNaN(parseInt(weight))
      );
    });
    return validArr.length >= 2;
  }
  return false;
}
