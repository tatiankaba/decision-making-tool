import { ElementCreator } from "../../core/BaseElement";
import "./button.css";

const CssStyles = {
  INPUT: "sound-input",
  LABEL: "sound-label",
  IMG: "sound-img",
  SOUND_OFF: "sound-off",
};

export default function createSoundInput(): HTMLElement {
  const params = {
    tag: "input",
    type: "checkbox",
    className: CssStyles.INPUT,
    id: "sound",
    name: "sound",
  };
  const soundInput = new ElementCreator(params).getElement();
  const handler = (): void => {
    label.classList.toggle(CssStyles.SOUND_OFF);
  };
  const parameters = {
    tag: "label",
    for: "sound",
    className: CssStyles.LABEL,
    callback: handler,
  };
  const label = new ElementCreator(parameters).getElement();
  label.append(soundInput);
  return label;
}
