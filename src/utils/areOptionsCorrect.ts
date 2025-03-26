import type { localStorageObject } from "../types/common";
import filterArray from "./filterArray";

export default function areOptionsCorrect(): boolean {
  const options = localStorage.getItem("options");
  if (options) {
    const arr: localStorageObject[] = JSON.parse(options);
    const validArr = filterArray(arr);
    return validArr.length >= 2;
  }
  return false;
}
