import "./modal-view.css";
import View from "../core/View";
import { ElementCreator } from "../core/BaseElement";

const CssStyles = {
  OVERLAY: "overlay",
  BODY: "body",
  HIDDEN: "hidden",
  MODAL: "modal",
  BUTTON: "button",
};

export default class ModalView extends View {
  #modal: HTMLElement;

  constructor() {
    const handler = (event: Event): void => {
      if (event.target === this.getElement()) {
        this.closeModalWindow();
      }
    };
    const params = {
      tag: "div",
      className: CssStyles.OVERLAY,
      callback: handler,
    };
    super(params);
    const parameters = {
      tag: "div",
      className: CssStyles.MODAL,
    };
    this.#modal = new ElementCreator(parameters).getElement();
    this.addChild(this.#modal);
  }

  protected createCloseBtn(text: string): HTMLElement {
    const handler = (): void => {
      this.closeModalWindow();
    };
    const params = {
      tag: "button",
      className: CssStyles.BUTTON,
      callback: handler,
      textContent: text,
    };
    const closeBtn = new ElementCreator(params).getElement();
    return closeBtn;
  }

  private closeModalWindow(): void {
    this.getElement().remove();
    document.body.classList.remove("hidden");
  }
}
