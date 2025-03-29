import type { localStorageObject } from "../types/common";

export default function getChosenOptionsArray():
  | localStorageObject[]
  | undefined {
  const chosenOptions = localStorage.getItem("chosenOptions");
  if (chosenOptions) {
    const array = JSON.parse(chosenOptions);
    return array;
  }
}
