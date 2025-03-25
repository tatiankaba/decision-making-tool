import HeaderView from "./header/header-view";
import Main from "./main/main-view";

export default class App {
  public header: HeaderView;
  public main: Main;
  constructor() {
    this.header = new HeaderView();
    this.main = new Main();
    document.body.append(this.header.getElement());
    document.body.append(this.main.getElement());
  }
}
