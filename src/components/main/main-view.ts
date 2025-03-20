import View from "../../core/View";
import "./main.css";
import Option from "../option/option";
import { ElementCreator } from "../../core/BaseElement";
import "./main.css";
import createSaveButton from "../buttons/save-btn";
import ListOfOptions from "../option-list/option-list";

const CssClasses = {
  MAIN: "main",
  UL: "ul",
  ADD_BUTTON: ["button", "add-btn"],
};

export default class Main extends View {
  #wrapper: ListOfOptions;
  #id: number;

  constructor() {
    const params = {
      tag: "main",
      className: CssClasses.MAIN,
    };
    super(params);
    this.#id = 1;
    this.#wrapper = new ListOfOptions();
    this.addChild([
      this.#wrapper.getElement(),
      this.createAddButton(),
      this.createClearButton(),
      createSaveButton(),
      this.createLoadBtn(),
    ]);
  }

  private createAddButton(): HTMLElement {
    const addOption = (): void => {
      this.#id = this.#wrapper.isListClear() ? 1 : (this.#id += 1);
      const newOption = new Option({
        id: `${this.#id.toString()}`,
      }).getElement();
      this.#wrapper.getElement().append(newOption);
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

  private createClearButton(): HTMLElement {
    const params = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: this.#wrapper.clearList.bind(this.#wrapper),
      textContent: "Clear list",
    };
    const clearBtn = new ElementCreator(params);
    return clearBtn.getElement();
  }

  private createLoadBtn(): HTMLElement {
    const handler = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const input: HTMLInputElement = event.target;
        if (!input.files?.length) return;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e): void => {
          if (typeof e.target?.result === "string") {
            const jsonData: string = JSON.parse(e.target?.result);
            localStorage.removeItem("options");
            this.#wrapper.clearList();
            localStorage.setItem("options", jsonData);
            this.#wrapper.updateList();
          }
        };
        reader.readAsText(file);
      }
    };
    const inputParams = {
      tag: "input",
      className: CssClasses.ADD_BUTTON,
      callback: handler,
      value: "Load file",
      typeOfEvent: "change",
      type: "file",
      accept: ".json",
    };
    const loadInput = new ElementCreator(inputParams).getElement();
    const btnHandler = (): void => {
      loadInput.click();
    };
    const btnParams = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: btnHandler,
      textContent: "Load file",
    };

    const loadBtn = new ElementCreator(btnParams);

    return loadBtn.getElement();
  }
}
