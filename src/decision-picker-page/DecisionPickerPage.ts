import HeaderView from "../components/header/header-view";
import DecisionPickerForm from "./DecisionPickerForm";
import { ElementCreator } from "../core/BaseElement";
import "./decision-picker.css";
import Canvas from "./canvas";

const CssStyles = {
  NOTIFICATION: "notification-field",
};

export default class DecisionPickerPage {
  private header: HeaderView;
  private form: DecisionPickerForm;
  private notification: HTMLElement;
  #canvas: Canvas;

  constructor() {
    this.header = new HeaderView();
    this.form = new DecisionPickerForm();
    const params = {
      tag: "p",
      className: CssStyles.NOTIFICATION,
      textContent: "Press start button",
    };
    this.notification = new ElementCreator(params).getElement();
    this.#canvas = new Canvas();
    document.body.append(
      this.header.getElement(),
      this.form.getElement(),
      this.notification,
      this.#canvas.getElement(),
    );
    // this.#canvas.startRotation();
    // this.updateNotification();
  }

  private updateNotification(): void {
    const rotationSpeed = 0.01;
    setInterval(() => {
      if (this.notification instanceof HTMLParagraphElement) {
        this.notification.textContent = this.#canvas.getTitle();
      }
    }, rotationSpeed);
  }
}
