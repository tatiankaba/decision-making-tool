import type { parameters } from "../types/common";
import { ElementCreator } from "./BaseElement";

export default class View {
  #element: HTMLElement;

  constructor(params: parameters) {
    this.#element = this.createView(params);
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  protected createView(params: parameters): HTMLElement {
    const elementCreator = new ElementCreator(params);
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
      element.forEach((child) => this.addChild(child));
    }
  }
}
