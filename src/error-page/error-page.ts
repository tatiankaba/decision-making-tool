import HeaderView from "../components/header/header-view";
import { ElementCreator } from "../core/base-element";
import "./error.css";
import createBackButton from "../components/buttons/back-button";

const CssStyles = {
  ERROR: "error-block",
  BACK_BTN: "back",
};

export default class ErrorPage {
  #header: HTMLElement;
  #errorBlock: HTMLElement;
  #backBtn: HTMLElement;

  constructor() {
    const parameters = {
      tag: "div",
      className: CssStyles.ERROR,
      textContent: "This page doesn't exist. Try harder. Do better",
    };
    this.#errorBlock = new ElementCreator(parameters).getElement();
    this.#backBtn = createBackButton();
    this.#backBtn.classList.add(CssStyles.BACK_BTN);
    this.#header = new HeaderView().getElement();
    document.body.append(this.#header, this.#errorBlock, this.#backBtn);
  }
}
