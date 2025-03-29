import { ElementCreator } from "../../core/base-element";
import "./button.css";

const CssClasses = {
  SAVE_BUTTON: "save-btn",
  BUTTON: "btn",
};

export default function createSaveButton(): HTMLElement {
  const handler = (): void => {
    const options = localStorage.getItem("options");
    if (!options) {
      return;
    }
    const parsedOptions = JSON.parse(options);
    const jsonBlob = new Blob([JSON.stringify(parsedOptions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const parameters = {
      tag: "a",
      href: url,
      download: "data.json",
      className: "download-link",
    };
    const a = new ElementCreator(parameters).getElement();
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const parameters = {
    tag: "button",
    className: [CssClasses.SAVE_BUTTON, CssClasses.BUTTON],
    callback: handler,
    textContent: "Save list",
  };
  const saveButton = new ElementCreator(parameters);
  return saveButton.getElement();
}
