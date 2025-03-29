import type { parameters } from "../types/common";

export class ElementCreator {
  #element: HTMLElement;

  constructor(parameters_: parameters) {
    this.#element = document.createElement(parameters_.tag);
    this.setCSSClasses(parameters_.className);
    if (parameters_.textContent) {
      this.setText(parameters_.textContent);
    }

    if (parameters_.checked) {
      this.addCheckedStatus(parameters_.checked);
    }

    if (parameters_.callback) {
      this.setCallBack(parameters_.callback, parameters_.typeOfEvent);
    }
    if (parameters_.value) {
      this.setValue(parameters_.value);
    }
    if (parameters_.placeholder) {
      this.setPlaceholder(parameters_.placeholder);
    }
    if (parameters_.id) {
      this.#element.id = parameters_.id;
    }
    if (parameters_.type) {
      this.setType(parameters_.type);
    }
    if (parameters_.for) {
      this.setFor(parameters_.for);
    }
    if (parameters_.href) {
      this.setHref(parameters_.href);
    }

    if (parameters_.download) {
      this.setDownloadName(parameters_.download);
    }

    if (parameters_.accept) {
      this.setAccess(parameters_.accept);
    }

    if (parameters_.name) {
      this.setName(parameters_.name);
    }
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  protected setName(name: string): void {
    if (
      this.#element instanceof HTMLInputElement ||
      this.#element instanceof HTMLButtonElement
    ) {
      this.#element.name = name;
    }
  }

  protected setFor(forValue: string): void {
    if (this.#element instanceof HTMLLabelElement) {
      this.#element.htmlFor = forValue;
    }
  }

  protected addCheckedStatus(checked: boolean): void {
    if (this.#element instanceof HTMLInputElement) {
      this.#element.checked = checked;
    }
  }

  protected setAccess(accept: string): void {
    if (this.#element instanceof HTMLInputElement) {
      this.#element.accept = accept;
    }
  }

  protected setDownloadName(downloadName: string): void {
    if (this.#element instanceof HTMLAnchorElement) {
      this.#element.download = downloadName;
    }
  }

  protected setHref(href: string): void {
    if (this.#element instanceof HTMLAnchorElement) {
      this.#element.href = href;
    }
  }

  protected setValue(value: string | number): void {
    if (this.#element instanceof HTMLInputElement) {
      this.#element.value = String(value);
    }
  }

  protected setType(type: string): void {
    if (
      this.#element instanceof HTMLInputElement ||
      this.#element instanceof HTMLButtonElement
    ) {
      this.#element.type = type;
    }
  }

  protected setPlaceholder(placeholder: string): void {
    if (
      this.#element instanceof HTMLInputElement ||
      this.#element instanceof HTMLTextAreaElement
    ) {
      this.#element.placeholder = placeholder;
    }
  }

  protected setCSSClasses(classes: string[] | string): void {
    if (!this.#element) return;
    if (Array.isArray(classes)) {
      for (const className of classes) {
        this.#element.classList.add(className);
      }
    } else {
      this.#element.classList.add(classes);
    }
  }

  protected setText(text: string): void {
    if (!this.#element) return;
    this.#element.textContent = text;
  }

  protected setCallBack(
    callback: (event: Event) => void,
    typeOfEvent: string = "click",
  ): void {
    if (!this.#element) return;

    this.#element.addEventListener(typeOfEvent, (event: Event) => {
      callback(event);
    });
  }

  protected deleteElement(): void {
    this.#element.remove();
  }
}
