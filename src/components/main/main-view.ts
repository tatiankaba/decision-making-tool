import View from "../../core/View";
import "./main.css";
import Option from "../option/option";

const CssClasses = {
  MAIN: "main",
};

export default class Main extends View {
  constructor() {
    const params = {
      tag: "main",
      className: CssClasses.MAIN,
    };
    super(params);
    this.addChild(new Option("1").getElement());
  }
}
