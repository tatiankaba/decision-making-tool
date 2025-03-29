import View from "../../core/main-view";
import "./main.css";
import { ElementCreator } from "../../core/base-element";
import "./main.css";
import createSaveButton from "../buttons/save-button";
import type { ListOfOptions } from "../option-list/option-list";
import { listOfOptions } from "../option-list/option-list";
import { isJSONValid } from "../../utils/is-json-valid";
import pasteListModalView from "../../modal-view/paste-list-modal";
import navigateToPage from "../../utils/navigate-to";
import areOptionsCorrect from "../../utils/are-options-correct";
import StartModalWindow from "../../modal-view/start-modal-window";
import saveDataToLocalStorage from "../../utils/save-data-to-local-storage";
import showNotification from "../../utils/show-notification";

const CssClasses = {
  MAIN: "main",
  ADD_BUTTON: ["button", "add-btn"],
};

export default class Main extends View {
  #wrapper: ListOfOptions;
  #id: number;
  #pasteBtn: HTMLElement;
  #startBtn: HTMLElement;

  constructor() {
    const parameters = {
      tag: "main",
      className: CssClasses.MAIN,
    };
    super(parameters);
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
        currentElement.firstElementChild.remove();
      }
    }
    currentElement.append(element);
  }

  private createAddButton(): HTMLElement {
    const addOption = (): void => {
      this.#wrapper.addOption();
    };
    const parameters = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: addOption,
      textContent: "add option",
    };
    const addButton = new ElementCreator(parameters);
    return addButton.getElement();
  }

  private createClearButton(): HTMLElement {
    const parameters = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: this.#wrapper.clearList.bind(this.#wrapper),
      textContent: "Clear list",
    };
    const clearButton = new ElementCreator(parameters);
    return clearButton.getElement();
  }

  private createPasteButton(): HTMLElement {
    const handler = (): void => {
      const modal = new pasteListModalView().getElement();
      document.body.append(modal);
    };
    const parameters = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: handler,
      textContent: "Paste list",
    };
    this.#pasteBtn = new ElementCreator(parameters).getElement();
    return this.#pasteBtn;
  }

  private createLoadBtn(): HTMLElement {
    const handler = async (event: Event): Promise<void> => {
      if (event.target instanceof HTMLInputElement) {
        const input: HTMLInputElement = event.target;
        if (!input.files?.length) return;
        const file = input.files[0];
        try {
          const response = await file.text();
          if (typeof response !== "string") {
            throw new TypeError("File content is not a string");
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
            showNotification("The file is in the wrong format");
          } else {
            showNotification("Unknown error");
          }
        }
      }
    };
    const inputParameters = {
      tag: "input",
      className: CssClasses.ADD_BUTTON,
      callback: handler,
      value: "Load file",
      typeOfEvent: "change",
      type: "file",
      accept: ".json",
    };
    const loadInput = new ElementCreator(inputParameters).getElement();
    const buttonHandler = (): void => {
      loadInput.click();
    };
    const buttonParameters = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: buttonHandler,
      textContent: "Load file",
    };

    const loadButton = new ElementCreator(buttonParameters);

    return loadButton.getElement();
  }

  private createStartButton(): HTMLElement {
    const handler = (): void => {
      if (areOptionsCorrect()) {
        saveDataToLocalStorage();
        navigateToPage("/#/decision-picker");
      } else {
        document.body.append(new StartModalWindow().getElement());
      }
    };
    const parameters = {
      tag: "button",
      className: CssClasses.ADD_BUTTON,
      callback: handler,
      textContent: "Start",
    };
    this.#startBtn = new ElementCreator(parameters).getElement();
    return this.#startBtn;
  }
}
