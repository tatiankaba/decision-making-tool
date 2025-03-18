import ElementCreator from "../../core/BaseElement"
import "./header.css"

const CssClasses = {
    HEADER: 'header'
}

export default class HeaderView {

    element: HTMLElement;

    constructor() {
        this.element = this.createView();
    }


    protected createView(): HTMLElement {
        const footerParameters = {
            tag: "header",
            className: CssClasses.HEADER,
            textContent: 'decision making tool'
        }
        const elementCreator = new ElementCreator(footerParameters);
        const element = elementCreator.getElement();

        return element;
    }

    public getElement() {
        return this.element;
    }
}