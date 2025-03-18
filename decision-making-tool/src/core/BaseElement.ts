
type parameters = {
    tag: string,
    textContent?: string,
    className: string[] | string,
    callback?: (event: MouseEvent)=> void,
    id?: number
}


export default class ElementCreator<T extends HTMLElement> {

    #element: HTMLElement;

    constructor(params: parameters) {
        this.#element = document.createElement(params.tag);
        this.setCSSClasses(params.className);
        if(params.textContent) {
            this.setText(params.textContent);

        }
        if(params.callback) {
            this.setCallBack(params.callback)
        }

    }

    public getElement() {
        return this.#element;
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

    protected setText(text: string) {
        if (!this.#element) return; 
        this.#element.textContent = text;
    }

    protected setCallBack(callback: (event: MouseEvent) => void) {
        if (!this.#element) return;
    
        this.#element.addEventListener('click', (event: MouseEvent) => {
            callback(event);
        });
    }

}