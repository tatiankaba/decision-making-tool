import HeaderView from "./header/header-view";

export default class App {
  private header: HeaderView;
  constructor() {
    this.createView();
  }

  protected createView(): void {
    this.header = new HeaderView();
    document.body.append(this.header.getElement());
  }
}
