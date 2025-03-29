import createBackButton from "../components/buttons/back-button";
import "./decision-picker.css";
import View from "../core/main-view";
import createSoundInput from "../components/buttons/sound-button";
import createSecInput from "../components/inputs/sec-input";
import createSubmitButton from "../components/buttons/submit-button";

const CssStyles = {
  WRAPPER: "btns-wrapper",
};

export default class BtnsWrapper extends View {
  #backBtn: HTMLElement;
  #soundBtn: HTMLElement;
  #secInput: HTMLElement;
  #submitBtn: HTMLElement;

  constructor() {
    const parameters = {
      tag: "div",
      className: CssStyles.WRAPPER,
    };
    super(parameters);
    this.#soundBtn = createSoundInput();
    this.#backBtn = createBackButton();
    this.#secInput = createSecInput();
    this.#submitBtn = createSubmitButton();
    this.addChild(this.#backBtn);
    this.addChild(this.#soundBtn);
    this.addChild(this.#secInput);
    this.addChild(this.#submitBtn);
  }
}
