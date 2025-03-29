import { ElementCreator } from "../../core/base-element";

const CssStyles = {
  SUBMIT_BUTTON: "submit-btn",
  BUTTON: "btn",
};

export default function createSubmitButton(): HTMLElement {
  const parameters = {
    tag: "button",
    type: "submit",
    textContent: "start",
    className: [CssStyles.SUBMIT_BUTTON, CssStyles.BUTTON],
  };
  const submitButton = new ElementCreator(parameters).getElement();
  return submitButton;
}
