import View from "../../core/View";
import "./main.css";
import { ElementCreator } from "../../core/BaseElement";
import "./main.css";
import createSaveButton from "../buttons/save-btn";
import type { ListOfOptions } from "../option-list/option-list";
import { listOfOptions } from "../option-list/option-list";
import { isJSONValid } from "../../utils/isJSONValid";
import pasteListModalView from "../../modal-view/pasteListModal";
import navigateToPage from "../../utils/navigateTO";
import areOptionsCorrect from "../../utils/areOptionsCorrect";
import StartModalWindow from "../../modal-view/startModalWindow";

const CssClasses = {
  MAIN: "main",
  UL: "ul",
  ADD_BUTTON: ["button", "add-btn"],
};

export default class Main extends View {
  #wrapper: ListOfOptions;
  #id: number;
  #pasteBtn: HTMLElement;
  #startBtn: HTMLElement;

  constructor() {
    const params = {
      tag: "main",
      className: CssClasses.MAIN,
    };
    super(params);
    this.#id = 1;
    this.#startBtn = this.createStartButton();
    this.#wrapper = listOfOptions;
    this.#pasteBtn = this.createPasteButton();
    this.addChild([
      this.#wrapper.getElement(),
      this.createAddButton(),
      this.createClearButton(),
      createSaveButton(),
      this.createLoadBtn(),
      this.#pasteBtn,
      this.#startBtn,
    ]);
  }

  public getListOfOptions(): HTMLElement {
    return this.#wrapper.getElement();
  }

  public setContent(view: View): void {
    const element = view.getElement();
    const currentElement = this.#wrapper.getElement();
    if (currentElement !== null) {
      while (currentElement.firstElementChild) {
        currentElement.removeChild(currentElement.firstElementChild);
      }
    }
    currentElement.append(element);
  }

  private createAddButton(): HTMLElement {
    const addOption = (): void => {
      this.#wrapper.addOption();
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

  private createPasteButton(): HTMLElement {
    const handler = (): void => {
      const modal = new pasteListModalView().getElement();
      document.body.append(modal);
    };
    const params = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: handler,
      textContent: "Paste list",
    };
    this.#pasteBtn = new ElementCreator(params).getElement();
    return this.#pasteBtn;
  }

  private createLoadBtn(): HTMLElement {
    const handler = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const input: HTMLInputElement = event.target;
        if (!input.files?.length) return;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e): void => {
          try {
            const response = e.target?.result;
            if (typeof response !== "string") {
              throw new Error("File content is not a string");
            }
            const parsedJsonData = JSON.parse(response);
            if (isJSONValid(parsedJsonData)) {
              localStorage.removeItem("options");
              this.#wrapper.clearList();
              localStorage.setItem("options", JSON.stringify(parsedJsonData));
              this.#wrapper.updateList();
            } else {
              throw new Error("Your file isn't correct JSON");
            }
          } catch (error) {
            if (error instanceof Error) {
              alert("File is incorrect: " + error.message);
            } else {
              alert("Unknown error");
            }
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

  private createStartButton(): HTMLElement {
    const handler = (): void => {
      if (areOptionsCorrect()) {
        navigateToPage("/decision-picker");
      } else {
        document.body.append(new StartModalWindow().getElement());
      }
    };
    const params = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: handler,
      textContent: "Start",
    };
    this.#startBtn = new ElementCreator(params).getElement();
    return this.#startBtn;
  }
}
