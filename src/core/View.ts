import type { parameters } from "./BaseElement";
import { ElementCreator } from "./BaseElement";

export default class View {
  #element: HTMLElement;
  #children: HTMLElement[] | HTMLElement | null | undefined;

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
