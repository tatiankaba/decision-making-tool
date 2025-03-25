import Option from "../option/option";
import { ElementCreator } from "../../core/BaseElement";
import "./option-list.css";
import type { localStorageObject } from "../../types/common";

const CssClasses = {
  UL: "ul",
};

export class ListOfOptions {
  #wrapper: HTMLElement;
  #id: number;

  constructor() {
    this.#wrapper = this.createOptionWrapper();
    this.#id = 1;
  }

  public updateList(): void {
    const storedData = localStorage.getItem("options");
    if (storedData) {
      const options: localStorageObject[] = JSON.parse(storedData);
      options.forEach((obj: localStorageObject) => {
        const option = new Option(obj).getElement();
        this.#wrapper.append(option);
      });
    }
  }

  public isListClear(): boolean {
    return !this.#wrapper.firstChild;
  }

  public addOption(title?: string, weight?: string): void {
    this.#id = this.isListClear() ? 1 : this.setId();
    const newOption = new Option({
      id: `${this.#id.toString()}`,
      title: title,
      weight: weight,
    }).getElement();
    this.#wrapper.append(newOption);
  }

  public clearList(): void {
    while (this.#wrapper.firstChild) {
      this.#wrapper.removeChild(this.#wrapper.firstChild);
    }
    this.#id = 1;
    localStorage.removeItem("options");
  }

  public getElement(): HTMLElement {
    return this.#wrapper;
  }

  private createOptionWrapper(): HTMLElement {
    const params = {
      tag: "ul",
      className: CssClasses.UL,
    };
    const wrapper = new ElementCreator(params);
    this.#wrapper = wrapper.getElement();
    if (localStorage.getItem("options")) {
      this.updateList();
    }
    return this.#wrapper;
  }

  private setId(): number {
    const lastOption = this.#wrapper.lastChild;
    let id: string | null;
    if (lastOption instanceof HTMLElement) {
      if (
        lastOption.children[1] instanceof HTMLElement &&
        lastOption.children[1].getAttribute("id") !== null
      ) {
        id = lastOption.children[1].getAttribute("id");
        this.#id = Number(id) + 1;
      }
    }
    return this.#id;
  }
}

export const listOfOptions: ListOfOptions = new ListOfOptions();
