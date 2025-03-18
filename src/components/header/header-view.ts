import ElementCreator from "../../core/BaseElement";
import "./header.css";

const CssClasses = {
  HEADER: "header",
};

export default class HeaderView {
  #element: HTMLElement;

  constructor() {
    this.#element = this.createView();
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  protected createView(): HTMLElement {
    const footerParameters = {
      tag: "header",
      className: CssClasses.HEADER,
      textContent: "decision making tool",
    };
    const elementCreator = new ElementCreator(footerParameters);
    this.#element = elementCreator.getElement();
    return this.#element;
  }
}
