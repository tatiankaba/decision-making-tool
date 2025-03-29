import ModalView from "./modal-view";
import { ElementCreator } from "../core/base-element";
import "./paste-list.css";
import isTypedOptionInCVSFormat from "../utils/is-typed-text-in-cvs-format";
import { listOfOptions } from "../components/option-list/option-list";

const CssClasses = {
  TEXTAREA: "textarea",
  CONFIRM_BUTTON: "confirm-btn",
  BTNS_WRAPPER: "btns-wrapper",
};

export default class pasteListModalView extends ModalView {
  #textarea: HTMLElement;
  #modal: HTMLElement;
  #closeBtn: HTMLElement;
  #btnsWrapper: HTMLElement;
  #confirmBtn: HTMLElement;

  constructor() {
    super();
    const parameters = {
      tag: "textarea",
      className: CssClasses.TEXTAREA,
      placeholder: `Paste a list of new options in a CSV-like format:
title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with &quot;quotes&quot;,4   -> | title with &quot;quotes&quot;   | 4 |`,
    };
    this.#btnsWrapper = this.createBtnsWrapper();
    this.#textarea = new ElementCreator(parameters).getElement();
    this.#closeBtn = this.createCloseBtn("cancel");
    this.#confirmBtn = this.createConfirmBtn();
    this.#modal = this.getModalWindow();
    this.#btnsWrapper.append(this.#closeBtn, this.#confirmBtn);
    this.#modal.append(this.#textarea, this.#btnsWrapper);
  }

  private createBtnsWrapper(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(CssClasses.BTNS_WRAPPER);
    this.#btnsWrapper = wrapper;
    return wrapper;
  }

  private createConfirmBtn(): HTMLElement {
    const handler = (): void => {
      if (this.#textarea instanceof HTMLTextAreaElement) {
        const value: string = this.#textarea.value;
        if (value.length > 0) {
          const array: string[] = value.split("\n");
          for (const line of array) {
            if (isTypedOptionInCVSFormat(line)) {
              const array = line.split(",");
              const lastDigit = String(array.at(-1));
              listOfOptions.addOption(array.slice(0, -1).join(""), lastDigit);
            }
          }
        }
      }
      this.closeModalWindow();
    };
    const parameters = {
      tag: "button",
      className: CssClasses.CONFIRM_BUTTON,
      textContent: "confirm",
      callback: handler,
    };
    this.#confirmBtn = new ElementCreator(parameters).getElement();
    return this.#confirmBtn;
  }
}
