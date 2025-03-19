import { ElementCreator } from "../../core/BaseElement";
import "./option.css";

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
  #weight: string = "";

  constructor(id: string) {
    const params = {
      tag: "li",
      className: CssClasses.LI,
    };
    this.#element = new ElementCreator(params).getElement();
    this.#id = id;
    this.#element.append(
      this.createLabel(),
      this.createTitleInput(),
      this.createWeightInput(),
      this.createDeleteBtn(),
    );
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  private createLabel(): HTMLElement {
    const params = {
      tag: "label",
      className: CssClasses.LABEL,
      for: this.#id,
    };
    const label = new ElementCreator(params);
    return label.getElement();
  }

  private createTitleInput(): HTMLElement {
    const inputChange = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const input = event.target;
        this.#title = input.value;
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
    };
    const inputTitle = new ElementCreator(params);
    return inputTitle.getElement();
  }

  private createWeightInput(): HTMLElement {
    const inputChange = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const input = event.target;
        this.#weight = input.value;
      }
    };
    const params = {
      tag: "input",
      className: CssClasses.INPUT,
      callback: inputChange,
      placeholder: "Weight",
      type: "number",
      typeOfEvent: "input",
    };
    const inputWeight = new ElementCreator(params);
    return inputWeight.getElement();
  }

  private createDeleteBtn(): HTMLElement {
    const removeElement = (): void => {
      this.#element.remove();
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
}
