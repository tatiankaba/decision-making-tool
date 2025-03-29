import type { localStorageObject } from "../types/common";
import filterArray from "./filter-array";

export default function saveDataToLocalStorage(): void {
  const options = localStorage.getItem("options");
  if (options) {
    const array: localStorageObject[] = JSON.parse(options);
    const filteredArray: localStorageObject[] = filterArray(array);
    localStorage.setItem("chosenOptions", JSON.stringify(filteredArray));
  }
}
