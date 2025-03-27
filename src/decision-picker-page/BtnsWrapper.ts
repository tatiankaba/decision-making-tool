import createBackBtn from "../components/buttons/back-btn";
import "./decision-picker.css";
import View from "../core/View";
import createSoundInput from "../components/buttons/soundBtn";
import createSecInput from "../components/inputs/secInput";

const CssStyles = {
  WRAPPER: "btns-wrapper",
};

export default class BtnsWrapper extends View {
  #backBtn: HTMLElement;
  #soundBtn: HTMLElement;
  #secInput: HTMLElement;

  constructor() {
    const params = {
      tag: "div",
      className: CssStyles.WRAPPER,
    };
    super(params);
    this.#soundBtn = createSoundInput();
    this.#backBtn = createBackBtn();
    this.#secInput = createSecInput();
    this.addChild(this.#backBtn);
    this.addChild(this.#soundBtn);
    this.addChild(this.#secInput);
  }
}
