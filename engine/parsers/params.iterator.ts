import { IVAPIMarkupVariable } from "../connectors/connector.types";

export class ParamIterable implements IVAPIMarkupVariable {

    private element!: Element
    private i!: number

    constructor(element: Element, index: number) {
        this.element = element;
        this.i = index;
    }

    get index(): number {
        return this.i
    }

    get id(): string {

        const attribute = this.element.getAttribute("id");

        // It always has p- because this is a UI behavior. If not - then basically error
        const stringId = attribute!.split("p-").pop()!;

        return stringId;
    }

    get key(): string {
        return this.element.getAttribute('prst-key') || ''
    }

    get type(): string {
        return this.element.getAttribute('prst-param-type') || ''
    }

    get path(): string {
        return this.element.getAttribute('prst-param-path') || ''
    }

    get name(): any {
        return this.element.getAttribute('prst-param-name') || ''
    }

    get value(): any {
        return this.element.getAttribute('prst-param-value') || ''
    }

    get issuer(): string {
        return this.element.getAttribute('prst-param-issuer') || ''
    }

    get referenceId(): string {
        return this.element.getAttribute('prst-reference-id') || ''
    }

    get replacement() {
        return this.element.outerHTML;
    }


    toJSON(): IVAPIMarkupVariable {
        return {
            id: this.id,
            name: this.name,
            key: this.key,
            type: this.type,
            value: this.value,
            issuer: this.issuer,
            referenceId: this.referenceId,
        }
    }


}




export class ParamsIterator implements Iterator<ParamIterable> {
    private data: ParamIterable[];
    private index: number;

    constructor(data: HTMLElement[]) {
        this.data = data.map((element, index) => new ParamIterable(element, index));
        this.index = 0;
    }


    get length(): number {
        return this.data.length;
    }

    // Implement the `next()` method of the iterator protocol
    next(): IteratorResult<ParamIterable> {
        if (this.index < this.data.length) {
            return { value: this.data[this.index++], done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    // Custom method to get the current value
    current(): ParamIterable | undefined {
        if (this.index >= 0 && this.index < this.data.length) {
            return this.data[this.index];
        }
        return undefined;
    }

    [Symbol.iterator](): IterableIterator<ParamIterable> {
        return this;
    }

    toArray(): Array<IVAPIMarkupVariable> {
        return this.data.map(d => d.toJSON())
    }
}