import BtnsWrapper from "./BtnsWrapper";
import View from "../core/View";

const CssStyles = {
  FORM: "form",
};

export default class DecisionPickerForm extends View {
  private btnsWrapper: BtnsWrapper;
  private sound: string;
  private seconds: string;

  constructor() {
    const handler = (event: Event): void => {
      event.preventDefault();
      const form = this.getElement();
      if (form instanceof HTMLFormElement) {
        const elements: HTMLFormControlsCollection = form.elements;

        const soundInput = elements.namedItem("sound");
        if (soundInput instanceof HTMLInputElement) {
          this.sound = soundInput.value;
        }

        const secondsInput = elements.namedItem("seconds");
        if (secondsInput instanceof HTMLInputElement) {
          this.seconds = secondsInput.value;
        }

        if (Number(this.seconds) > 0) {
          const eventData = {
            seconds: this.seconds,
            sound: this.sound,
          };
          const event: CustomEvent = new CustomEvent("startAnimation", {
            detail: eventData,
          });
          document.dispatchEvent(event);
        }
      }
    };
    const params = {
      tag: "form",
      className: CssStyles.FORM,
      callback: handler,
      typeOfEvent: "submit",
    };
    super(params);
    this.btnsWrapper = new BtnsWrapper();
    this.sound = "true";
    this.seconds = "16";
    this.getElement().append(this.btnsWrapper.getElement());
  }
}
