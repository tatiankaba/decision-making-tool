import BtnsWrapper from "./BtnsWrapper";
import View from "../core/View";

const CssStyles = {
  FORM: "form",
};

export default class DecisionPickerForm extends View {
  private btnsWrapper: BtnsWrapper;

  constructor() {
    const handler = (event: Event): void => {
      event.preventDefault();
      const form = this.getElement();
      if (form instanceof HTMLFormElement) {
        console.log(form.elements);
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
    this.getElement().append(this.btnsWrapper.getElement());
  }
}
