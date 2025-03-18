import HeaderView from "./header/header-view";


export default class App {
    constructor(){
        this.createView()
    }

    createView() {
        const header = new HeaderView()
        document.body.append(header.getElement())
    }
}