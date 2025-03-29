import { ElementCreator } from "../../core/base-element";
import navigateToPage from "../../utils/navigate-to";
import "./button.css";

export default function createBackButton(): HTMLElement {
  const handler = (): void => {
    navigateToPage("/#/");
  };
  const parameters = {
    tag: "button",
    className: ["back-btn", "btn"],
    callback: handler,
    textContent: "BACK",
    type: "button",
  };
  const button = new ElementCreator(parameters).getElement();
  return button;
}
