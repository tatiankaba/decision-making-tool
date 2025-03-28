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

  constructor() {
    this.header = new HeaderView();
    this.form = new DecisionPickerForm();
    const params = {
      tag: "p",
      className: CssStyles.NOTIFICATION,
      textContent: "Press start button",
    };
    this.notification = new ElementCreator(params).getElement();
    document.body.append(
      this.header.getElement(),
      this.form.getElement(),
      this.notification,
      new Canvas().getElement(),
    );
  }
}
