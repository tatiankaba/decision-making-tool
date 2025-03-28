import { ElementCreator } from "../../core/BaseElement";

const CssStyles = {
  SUBMIT_BUTTON: "submit-btn",
  BUTTON: "btn",
};

export default function createSubmitBtn(): HTMLElement {
  const params = {
    tag: "button",
    type: "submit",
    textContent: "start",
    className: [CssStyles.SUBMIT_BUTTON, CssStyles.BUTTON],
  };
  const submitBtn = new ElementCreator(params).getElement();
  return submitBtn;
}
