import createBackBtn from "../components/buttons/back-btn";
import "./decision-picker.css";
import View from "../core/View";
import createSoundInput from "../components/buttons/soundBtn";
import createSecInput from "../components/inputs/secInput";
import createSubmitBtn from "../components/buttons/submit-btn";

const CssStyles = {
  WRAPPER: "btns-wrapper",
};

export default class BtnsWrapper extends View {
  #backBtn: HTMLElement;
  #soundBtn: HTMLElement;
  #secInput: HTMLElement;
  #submitBtn: HTMLElement;

  constructor() {
    const params = {
      tag: "div",
      className: CssStyles.WRAPPER,
    };
    super(params);
    this.#soundBtn = createSoundInput();
    this.#backBtn = createBackBtn();
    this.#secInput = createSecInput();
    this.#submitBtn = createSubmitBtn();
    this.addChild(this.#backBtn);
    this.addChild(this.#soundBtn);
    this.addChild(this.#secInput);
    this.addChild(this.#submitBtn);
  }
}
