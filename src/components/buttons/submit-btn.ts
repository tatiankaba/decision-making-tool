import { ElementCreator } from "../../core/BaseElement";

const CssStyles = {
  SUBMIT_BUTTON: "submit-btn",
  BUTTON: "btn",
};

export default function createSubmitBtn(): HTMLElement {
  const handler = (event: Event): void => {
    event.preventDefault();
  };
  const params = {
    tag: "button",
    type: "submit",
    textContent: "start",
    className: [CssStyles.SUBMIT_BUTTON, CssStyles.BUTTON],
    callback: handler,
  };
  const submitBtn = new ElementCreator(params).getElement();
  return submitBtn;
}
