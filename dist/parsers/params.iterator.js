"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsIterator = exports.ParamIterable = void 0;
class ParamIterable {
    element;
    i;
    constructor(element, index) {
        this.element = element;
        this.i = index;
    }
    get index() {
        return this.i;
    }
    get id() {
        const attribute = this.element.getAttribute("id");
        // It always has p- because this is a UI behavior. If not - then basically error
        const stringId = attribute.split("p-").pop();
        return stringId;
    }
    get key() {
        return this.element.getAttribute('prst-key') || '';
    }
    get type() {
        return this.element.getAttribute('prst-param-type') || '';
    }
    get path() {
        return this.element.getAttribute('prst-param-path') || '';
    }
    get name() {
        return this.element.getAttribute('prst-param-name') || '';
    }
    get value() {
        return this.element.getAttribute('prst-param-value') || '';
    }
    get issuer() {
        return this.element.getAttribute('prst-param-issuer') || '';
    }
    get referenceId() {
        return this.element.getAttribute('prst-reference-id') || '';
    }
    get replacement() {
        return this.element.outerHTML;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            key: this.key,
            type: this.type,
            value: this.value,
            issuer: this.issuer,
            referenceId: this.referenceId,
        };
    }
}
exports.ParamIterable = ParamIterable;
class ParamsIterator {
    data;
    index;
    constructor(data) {
        this.data = data.map((element, index) => new ParamIterable(element, index));
        this.index = 0;
    }
    get length() {
        return this.data.length;
    }
    // Implement the `next()` method of the iterator protocol
    next() {
        if (this.index < this.data.length) {
            return { value: this.data[this.index++], done: false };
        }
        else {
            return { value: undefined, done: true };
        }
    }
    // Custom method to get the current value
    current() {
        if (this.index >= 0 && this.index < this.data.length) {
            return this.data[this.index];
        }
        return undefined;
    }
    [Symbol.iterator]() {
        return this;
    }
    toArray() {
        return this.data.map(d => d.toJSON());
    }
}
exports.ParamsIterator = ParamsIterator;
//# sourceMappingURL=params.iterator.js.map