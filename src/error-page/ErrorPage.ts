import HeaderView from "../components/header/header-view";
import { ElementCreator } from "../core/BaseElement";
import "./error.css";

const CssStyles = {
  ERROR: "error-block",
};

export default class ErrorPage {
  #header: HTMLElement;
  #errorBlock;

  constructor() {
    const params = {
      tag: "div",
      className: CssStyles.ERROR,
      textContent: "This page doesn't exist. Try harder. Do better",
    };
    this.#errorBlock = new ElementCreator(params).getElement();
    this.#header = new HeaderView().getElement();
    document.body.append(this.#header, this.#errorBlock);
  }
}
