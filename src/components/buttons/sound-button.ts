import { ElementCreator } from "../../core/base-element";
import "./button.css";

const CssStyles = {
  INPUT: "sound-input",
  LABEL: "sound-label",
  IMG: "sound-img",
  SOUND_OFF: "sound-off",
};

export default function createSoundInput(): HTMLElement {
  const handler = (): void => {
    label.classList.toggle(CssStyles.SOUND_OFF);
  };
  const parameters_ = {
    tag: "input",
    type: "checkbox",
    className: CssStyles.INPUT,
    id: "sound",
    name: "sound",
    callback: handler,
    checked: true,
  };
  const soundInput = new ElementCreator(parameters_).getElement();

  const parameters = {
    tag: "label",
    for: "sound",
    className: CssStyles.LABEL,
    name: "sound",
  };
  const label = new ElementCreator(parameters).getElement();
  label.append(soundInput);
  return label;
}
