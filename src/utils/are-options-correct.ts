import type { localStorageObject } from "../types/common";
import filterArray from "./filter-array";

export default function areOptionsCorrect(): boolean {
  const options = localStorage.getItem("options");
  if (options) {
    const array: localStorageObject[] = JSON.parse(options);
    const validArray = filterArray(array);
    return validArray.length >= 2;
  }
  return false;
}
