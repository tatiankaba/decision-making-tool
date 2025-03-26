import HeaderView from "../components/header/header-view";

export default class DecisionPickerPage {
  public header: HeaderView;
  constructor() {
    this.header = new HeaderView();
    document.body.append(this.header.getElement());
  }
}
