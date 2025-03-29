import type { parameters } from "../types/common";
import { ElementCreator } from "./base-element";

export default class View {
  #element: HTMLElement;

  constructor(parameters_: parameters) {
    this.#element = this.createView(parameters_);
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  protected createView(parameters_: parameters): HTMLElement {
    const elementCreator = new ElementCreator(parameters_);
    this.#element = elementCreator.getElement();
    return this.#element;
  }

  protected addChild(
    element: HTMLElement | ElementCreator | (HTMLElement | ElementCreator)[],
  ): void {
    if (element instanceof ElementCreator) {
      this.#element.append(element.getElement());
    } else if (element instanceof HTMLElement) {
      this.#element.append(element);
    } else if (Array.isArray(element)) {
      for (const child of element) this.addChild(child);
    }
  }
}
