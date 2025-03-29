import "./modal-view.css";
import View from "../core/main-view";
import { ElementCreator } from "../core/base-element";

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
    const parameters_ = {
      tag: "div",
      className: CssStyles.OVERLAY,
      callback: handler,
    };
    super(parameters_);
    const parameters = {
      tag: "div",
      className: CssStyles.MODAL,
    };
    this.#modal = new ElementCreator(parameters).getElement();
    this.addChild(this.#modal);
  }

  public getModalWindow(): HTMLElement {
    return this.#modal;
  }

  protected createCloseBtn(text: string): HTMLElement {
    const handler = (): void => {
      this.closeModalWindow();
    };
    const parameters = {
      tag: "button",
      className: CssStyles.BUTTON,
      callback: handler,
      textContent: text,
    };
    const closeButton = new ElementCreator(parameters).getElement();
    return closeButton;
  }

  protected closeModalWindow(): void {
    this.getElement().remove();
    document.body.classList.remove("hidden");
  }
}
