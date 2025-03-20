import { ElementCreator } from "../../core/BaseElement";
import "./button.css";

const CssClasses = {
  SAVE_BUTTON: "save-btn",
};

export default function createSaveButton(): HTMLElement {
  const handler = (): void => {
    const options = localStorage.getItem("options");
    if (!options) {
      return;
    }
    const jsonBlob = new Blob([JSON.stringify(options, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const params = {
      tag: "a",
      href: url,
      download: "data.json",
      className: "download-link",
    };
    const a = new ElementCreator(params).getElement();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const params = {
    tag: "button",
    className: CssClasses.SAVE_BUTTON,
    callback: handler,
    textContent: "Save list",
  };
  const saveBtn = new ElementCreator(params);
  return saveBtn.getElement();
}
