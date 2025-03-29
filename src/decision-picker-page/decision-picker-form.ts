import BtnsWrapper from "./btns-wrapper";
import View from "../core/main-view";

const CssStyles = {
  FORM: "form",
};

export default class DecisionPickerForm extends View {
  private btnsWrapper: BtnsWrapper;
  private sound: boolean;
  private seconds: string;

  constructor() {
    const handler = (event: Event): void => {
      event.preventDefault();
      const form = this.getElement();
      if (form instanceof HTMLFormElement) {
        const elements: HTMLFormControlsCollection = form.elements;

        const soundInput = elements.namedItem("sound");
        if (soundInput instanceof HTMLInputElement) {
          this.sound = soundInput.checked;
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
    const parameters = {
      tag: "form",
      className: CssStyles.FORM,
      callback: handler,
      typeOfEvent: "submit",
    };
    super(parameters);
    this.btnsWrapper = new BtnsWrapper();
    this.sound = true;
    this.seconds = "16";
    this.getElement().append(this.btnsWrapper.getElement());
  }
}
