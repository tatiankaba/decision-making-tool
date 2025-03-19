import "./header.css";
import View from "../../core/View";
import { ElementCreator } from "../../core/BaseElement";

const CssClasses = {
  HEADER: "header",
  TITLE: "title",
};

export default class HeaderView extends View {
  constructor() {
    const footerParameters = {
      tag: "header",
      className: CssClasses.HEADER,
    };
    const titleParameters = {
      tag: "h1",
      textContent: "decision making tool",
      className: CssClasses.TITLE,
    };
    super(footerParameters);
    this.addChild(new ElementCreator(titleParameters));
  }
}
