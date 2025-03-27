import { ElementCreator } from "../../core/BaseElement";
import navigateToPage from "../../utils/navigateTO";
import "./button.css";

export default function createBackBtn(): HTMLElement {
  const handler = (): void => {
    navigateToPage("/");
  };
  const params = {
    tag: "button",
    className: ["back-btn", "btn"],
    callback: handler,
    textContent: "BACK",
  };
  const btn = new ElementCreator(params).getElement();
  return btn;
}
