import HeaderView from "../components/header/header-view";
import BtnsWrapper from "./BtnsWrapper";

export default class DecisionPickerPage {
  private header: HeaderView;
  private btnsWrapper: BtnsWrapper;
  constructor() {
    this.header = new HeaderView();
    this.btnsWrapper = new BtnsWrapper();
    document.body.append(
      this.header.getElement(),
      this.btnsWrapper.getElement(),
    );
  }
}
