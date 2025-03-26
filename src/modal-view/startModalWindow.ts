import { ElementCreator } from "../core/BaseElement";
import ModalView from "./ModalView";
import "./start-modal.css";

const CssClasses = {
  INFORMATION_WINDOW: "information-window",
};

export default class StartModalWindow extends ModalView {
  #modal: HTMLElement;
  #closeBtn: HTMLElement;
  #informationBlock: HTMLElement;

  constructor() {
    super();
    const params = {
      tag: "div",
      className: CssClasses.INFORMATION_WINDOW,
      textContent: `Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0`,
    };
    this.#informationBlock = new ElementCreator(params).getElement();
    this.#modal = this.getModalWindow();
    this.#closeBtn = this.createCloseBtn("Close");
    this.#modal.append(this.#informationBlock, this.#closeBtn);
  }
}
