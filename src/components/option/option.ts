import { ElementCreator } from "../../core/base-element";
import "./option.css";
import type { localStorageObject } from "../../types/common";
const CssClasses = {
  LI: "li",
  BUTTON: "btn",
  INPUT: "input",
  LABEL: "label",
};

export default class Option {
  #id: string;
  #element: HTMLElement;
  #title: string = "";
  #weight: number | string = "";

  constructor(object: localStorageObject) {
    const parameters = {
      tag: "li",
      className: CssClasses.LI,
    };
    this.#element = new ElementCreator(parameters).getElement();
    this.#id = object.id;
    if (object.title) {
      this.#title = object?.title;
    }
    if (object.id) {
      this.#id = object?.id;
    }
    if (object.weight) {
      this.#weight = Number.parseInt(object.weight);
    }
    this.#element.append(
      this.createLabel(),
      this.createTitleInput(),
      this.createWeightInput(),
      this.createDeleteBtn(),
    );
    this.saveIdToLocalStorage();
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  private createLabel(): HTMLElement {
    const parameters = {
      tag: "label",
      className: CssClasses.LABEL,
      for: this.#id,
      textContent: `#${this.#id}`,
    };
    const label = new ElementCreator(parameters);
    return label.getElement();
  }

  private createTitleInput(): HTMLElement {
    const inputChange = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const input = event.target;
        this.#title = input.value;
        this.updateLocaleStorage("title", this.#title);
      }
    };
    const parameters = {
      tag: "input",
      className: CssClasses.INPUT,
      callback: inputChange,
      placeholder: "Title",
      type: "text",
      id: this.#id,
      typeOfEvent: "input",
      value: this.#title ?? "",
    };
    const inputTitle = new ElementCreator(parameters);
    return inputTitle.getElement();
  }

  private createWeightInput(): HTMLElement {
    const inputChange = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const input = event.target;
        this.#weight = Number(input.value);
        this.updateLocaleStorage("weight", this.#weight.toString());
      }
    };
    const parameters = {
      tag: "input",
      className: CssClasses.INPUT,
      callback: inputChange,
      placeholder: "Weight",
      type: "number",
      typeOfEvent: "input",
      value: this.#weight ?? "",
    };
    const inputWeight = new ElementCreator(parameters);
    return inputWeight.getElement();
  }

  private createDeleteBtn(): HTMLElement {
    const removeElement = (): void => {
      this.#element.remove();
      this.deleteIdFromLocalStorage();
    };
    const parameters = {
      tag: "button",
      className: CssClasses.BUTTON,
      textContent: "delete",
      callback: removeElement,
    };
    const deleteButton = new ElementCreator(parameters);
    return deleteButton.getElement();
  }

  private saveIdToLocalStorage(): void {
    const optionsString: string | null = localStorage.getItem("options");
    let options: localStorageObject[] = [];
    if (optionsString) {
      options = JSON.parse(optionsString);
    }
    const isDuplicate = options.some((option) => option.id === this.#id);
    if (isDuplicate) return;
    options.push({
      id: this.#id,
      title: this.#title,
      weight: this.#weight?.toString(),
    });
    localStorage.setItem("options", JSON.stringify(options));
  }

  private deleteIdFromLocalStorage(): void {
    const optionsString: string | null = localStorage.getItem("options");
    if (optionsString) {
      const options: localStorageObject[] = JSON.parse(optionsString);
      const index = options.findIndex((option) => option.id === this.#id);
      options.splice(index, 1);
      localStorage.setItem("options", JSON.stringify(options));
    }
  }

  private updateLocaleStorage(
    property: keyof localStorageObject,
    value: string,
  ): void {
    const options: localStorageObject[] = JSON.parse(
      localStorage.getItem("options") || "[]",
    );
    const index: number = options.findIndex((option) => option.id === this.#id);
    if (index !== -1) {
      options[index][property] = value;
      localStorage.setItem("options", JSON.stringify(options));
    }
  }
}
