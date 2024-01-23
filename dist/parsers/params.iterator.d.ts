import { IVAPIMarkupVariable } from "../connectors/connector.types";
export declare class ParamIterable implements IVAPIMarkupVariable {
    private element;
    private i;
    constructor(element: Element, index: number);
    get index(): number;
    get id(): string;
    get key(): string;
    get type(): string;
    get path(): string;
    get issuer(): string;
    get referenceId(): string;
    get replacement(): string;
}
export declare class ParamsIterator implements Iterator<ParamIterable> {
    private data;
    private index;
    constructor(data: HTMLElement[]);
    get length(): number;
    next(): IteratorResult<ParamIterable>;
    current(): ParamIterable | undefined;
    [Symbol.iterator](): IterableIterator<ParamIterable>;
}
