import type { parameters } from "../types/common";

export class ElementCreator {
  #element: HTMLElement;

  constructor(params: parameters) {
    this.#element = document.createElement(params.tag);
    this.setCSSClasses(params.className);
    if (params.textContent) {
      this.setText(params.textContent);
    }
    if (params.callback) {
      this.setCallBack(params.callback, params.typeOfEvent);
    }
    if (params.value) {
      this.setValue(params.value);
    }
    if (params.placeholder) {
      this.setPlaceholder(params.placeholder);
    }
    if (params.id) {
      this.#element.id = params.id;
    }
    if (params.type) {
      this.setType(params.type);
    }
    if (params.for) {
      this.setFor(params.for);
    }
    if (params.href) {
      this.setHref(params.href);
    }

    if (params.download) {
      this.setDownloadName(params.download);
    }

    if (params.accept) {
      this.setAccess(params.accept);
    }
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  protected setFor(forValue: string): void {
    if (this.#element instanceof HTMLLabelElement) {
      this.#element.htmlFor = forValue;
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
      classes.forEach((className) => {
        this.#element.classList.add(className);
      });
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
