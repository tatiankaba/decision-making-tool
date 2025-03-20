import View from "../../core/View";
import "./main.css";
import Option from "../option/option";
import { ElementCreator } from "../../core/BaseElement";
import "./main.css";

const CssClasses = {
  MAIN: "main",
  UL: "ul",
  ADD_BUTTON: ["button", "add-btn"],
};

export default class Main extends View {
  #wrapper: HTMLElement;
  #id: number;

  constructor() {
    const params = {
      tag: "main",
      className: CssClasses.MAIN,
    };
    super(params);
    this.#id = 1;
    this.#wrapper = this.createOptionWrapper();
    this.addChild([
      this.#wrapper,
      this.createAddButton(),
      this.createClearButton(),
    ]);
  }

  public clearList(): void {
    while (this.#wrapper.firstChild) {
      this.#wrapper.removeChild(this.#wrapper.firstChild);
    }
    this.#id = 1;
    localStorage.removeItem("options");
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
      this.#id = this.isListClear() ? 1 : (this.#id += 1);
      const newOption = new Option({
        id: `${this.#id.toString()}`,
      }).getElement();
      this.#wrapper.append(newOption);
    };
    const params = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: addOption,
      textContent: "add option",
    };
    const addBtn = new ElementCreator(params);
    return addBtn.getElement();
  }

  private isListClear(): boolean {
    return !this.#wrapper.firstChild;
  }

  private createClearButton(): HTMLElement {
    const params = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: this.clearList.bind(this),
      textContent: "Clear list",
    };
    const clearBtn = new ElementCreator(params);
    return clearBtn.getElement();
  }
}
