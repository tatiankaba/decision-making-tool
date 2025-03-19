import HeaderView from "./header/header-view";
import Main from "./main/main-view";

export default class App {
  private header: HTMLElement;
  private main: HTMLElement;
  constructor() {
    this.header = new HeaderView().getElement();
    this.main = new Main().getElement();
    document.body.append(this.header);
    document.body.append(this.main);
  }
}
