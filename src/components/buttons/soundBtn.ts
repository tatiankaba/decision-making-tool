import { ElementCreator } from "../../core/BaseElement";
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
    if (soundInput instanceof HTMLInputElement) {
      console.log(soundInput.checked);
    }
  };
  const params = {
    tag: "input",
    type: "checkbox",
    className: CssStyles.INPUT,
    id: "sound",
    name: "sound",
    callback: handler,
    checked: true,
  };
  const soundInput = new ElementCreator(params).getElement();

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
