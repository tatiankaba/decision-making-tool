export type parameters = {
  tag: string;
  textContent?: string;
  className: string[] | string;
  callback?: (event: Event) => void;
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  typeOfEvent?: string | "click";
  for?: string;
};

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
  }

  public getElement(): HTMLElement {
    return this.#element;
  }

  protected setFor(forValue: string): void {
    if (this.#element instanceof HTMLLabelElement) {
      this.#element.htmlFor = forValue;
    }
  }

  protected setType(type: string): void {
    if (this.#element instanceof HTMLInputElement) {
      this.#element.type = type;
    }
  }

  protected setPlaceholder(placeholder: string): void {
    if (this.#element instanceof HTMLInputElement) {
      this.#element.placeholder = placeholder;
    }
  }

  protected setCSSClasses(classes: string[] | string): void {
    if (!this.#element) return;
    if (Array.isArray(classes)) {
      classes.forEach((className) => {
        this.#element!.classList.add(className);
      });
    } else {
      this.#element!.classList.add(classes);
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
