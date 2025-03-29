import HeaderView from "../components/header/header-view";
import DecisionPickerForm from "./decision-picker-form";
import { ElementCreator } from "../core/base-element";
import "./decision-picker.css";
import Canvas from "./canvas";
import { playMusic } from "../utils/sound-bar";

const CssStyles = {
  NOTIFICATION: "notification-field",
};

declare global {
  interface DocumentEventMap {
    startAnimation: CustomEvent;
  }
}

export default class DecisionPickerPage {
  private header: HeaderView;
  private form: DecisionPickerForm;
  private notification: HTMLElement;
  #canvas: Canvas;

  constructor() {
    this.header = new HeaderView();
    this.form = new DecisionPickerForm();
    const parameters = {
      tag: "p",
      className: CssStyles.NOTIFICATION,
      textContent: "Press start button",
    };
    this.notification = new ElementCreator(parameters).getElement();
    this.#canvas = new Canvas();
    document.body.append(
      this.header.getElement(),
      this.form.getElement(),
      this.notification,
      this.#canvas.getElement(),
    );
    this.addEventListeners();
  }

  private updateNotification(): void {
    const rotationSpeed = 0.01;
    setInterval(() => {
      if (this.notification instanceof HTMLParagraphElement) {
        this.notification.textContent = this.#canvas.getTitle();
      }
    }, rotationSpeed);
  }

  private addEventListeners(): void {
    document.addEventListener("startAnimation", (event: CustomEvent): void => {
      if (event instanceof CustomEvent) {
        const { seconds, sound } = event.detail;
        if (this.#canvas) {
          this.#canvas.startRotation();
          this.updateNotification();
          setTimeout(
            () => {
              this.#canvas.stopRotation();
              if (sound) {
                playMusic();
              }
            },
            Number(seconds) * 1000,
          );
        }
      }
    });
  }
}
