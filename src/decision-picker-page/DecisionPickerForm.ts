import BtnsWrapper from "./BtnsWrapper";
import View from "../core/View";

const CssStyles = {
  FORM: "form",
};

export default class DecisionPickerForm extends View {
  private btnsWrapper: BtnsWrapper;

  constructor() {
    const params = {
      tag: "form",
      className: CssStyles.FORM,
    };
    super(params);
    this.btnsWrapper = new BtnsWrapper();
    this.getElement().append(this.btnsWrapper.getElement());
  }
}
