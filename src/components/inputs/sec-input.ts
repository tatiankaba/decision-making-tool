import { ElementCreator } from "../../core/base-element";
import "./input.css";

const CssStyles = {
  INPUT: "sec-input",
  LABEL: "label-input",
  WRAPPER: "sec-input-wrapper",
};

export default function createSecInput(): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add(CssStyles.WRAPPER);
  const parameters_ = {
    tag: "input",
    className: CssStyles.INPUT,
    placeholder: "sec",
    type: "number",
    id: "sec",
    name: "seconds",
  };
  const input = new ElementCreator(parameters_).getElement();
  const parameters = {
    tag: "label",
    className: CssStyles.LABEL,
    for: "sec",
    name: "seconds",
  };
  const label = new ElementCreator(parameters).getElement();
  input.setAttribute("required", "");
  input.setAttribute("min", "5");
  input.setAttribute("value", "16");
  wrapper.append(label, input);
  return wrapper;
}
