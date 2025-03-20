import { ElementCreator } from "../../core/BaseElement";
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

  constructor(obj: localStorageObject) {
    const params = {
      tag: "li",
      className: CssClasses.LI,
    };
    this.#element = new ElementCreator(params).getElement();
    this.#id = obj.id;
    if (obj.title) {
      this.#title = obj?.title;
    }
    if (obj.id) {
      this.#id = obj?.id;
    }
    if (obj.weight) {
      this.#weight = parseInt(obj.weight);
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
    const params = {
      tag: "label",
      className: CssClasses.LABEL,
      for: this.#id,
      textContent: `#${this.#id}`,
    };
    const label = new ElementCreator(params);
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
    const params = {
      tag: "input",
      className: CssClasses.INPUT,
      callback: inputChange,
      placeholder: "Title",
      type: "text",
      id: this.#id,
      typeOfEvent: "input",
      value: this.#title ?? "",
    };
    const inputTitle = new ElementCreator(params);
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
    const params = {
      tag: "input",
      className: CssClasses.INPUT,
      callback: inputChange,
      placeholder: "Weight",
      type: "number",
      typeOfEvent: "input",
      value: this.#weight ?? "",
    };
    const inputWeight = new ElementCreator(params);
    return inputWeight.getElement();
  }

  private createDeleteBtn(): HTMLElement {
    const removeElement = (): void => {
      this.#element.remove();
      this.deleteIdFromLocalStorage();
    };
    const params = {
      tag: "button",
      className: CssClasses.BUTTON,
      textContent: "delete",
      callback: removeElement,
    };
    const deleteBtn = new ElementCreator(params);
    return deleteBtn.getElement();
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
    prop: keyof localStorageObject,
    value: string,
  ): void {
    const options: localStorageObject[] = JSON.parse(
      localStorage.getItem("options") || "[]",
    );
    const index: number = options.findIndex((option) => option.id === this.#id);
    if (index !== -1) {
      options[index][prop] = value;
      localStorage.setItem("options", JSON.stringify(options));
    }
  }
}
