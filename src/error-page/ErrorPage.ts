import HeaderView from "../components/header/header-view";
import { ElementCreator } from "../core/BaseElement";
import "./error.css";
import createBackBtn from "../components/buttons/back-btn";

const CssStyles = {
  ERROR: "error-block",
  BACK_BTN: "back",
};

export default class ErrorPage {
  #header: HTMLElement;
  #errorBlock: HTMLElement;
  #backBtn: HTMLElement;

  constructor() {
    const params = {
      tag: "div",
      className: CssStyles.ERROR,
      textContent: "This page doesn't exist. Try harder. Do better",
    };
    this.#errorBlock = new ElementCreator(params).getElement();
    this.#backBtn = createBackBtn();
    this.#backBtn.classList.add(CssStyles.BACK_BTN);
    this.#header = new HeaderView().getElement();
    document.body.append(this.#header, this.#errorBlock, this.#backBtn);
  }
}
