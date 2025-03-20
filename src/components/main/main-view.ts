import View from "../../core/View";
import "./main.css";
import Option from "../option/option";
import { ElementCreator } from "../../core/BaseElement";

const CssClasses = {
  MAIN: "main",
  UL: "ul",
  ADD_BUTTON: "button.add-btn",
};

export default class Main extends View {
  #wrapper: HTMLElement;
  constructor() {
    const params = {
      tag: "main",
      className: CssClasses.MAIN,
    };
    super(params);
    this.#wrapper = this.createOptionWrapper();
    this.addChild([this.#wrapper, this.createAddButton()]);
  }

  private createOptionWrapper(): HTMLElement {
    const params = {
      tag: "ul",
      className: CssClasses.UL,
    };
    const wrapper = new ElementCreator(params);
    this.#wrapper = wrapper.getElement();
    return this.#wrapper;
  }

  private createAddButton(): HTMLElement {
    const addOption = (): void => {
      const newOption = new Option("1").getElement();
      this.#wrapper.append(newOption);
    };
    const params = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: addOption,
      textContent: "add option",
    };
    const wrapper = new ElementCreator(params);
    return wrapper.getElement();
  }
}
