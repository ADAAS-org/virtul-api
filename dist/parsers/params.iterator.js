"use strict";
exports.__esModule = true;
var ParamIterable = /** @class */ (function () {
    function ParamIterable(element, index) {
        this.element = element;
        this.i = index;
    }
    Object.defineProperty(ParamIterable.prototype, "index", {
        get: function () {
            return this.i;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "id", {
        get: function () {
            var attribute = this.element.getAttribute("id");
            // It always has p- because this is a UI behavior. If not - then basically error
            var stringId = attribute.split("p-").pop();
            return stringId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "key", {
        get: function () {
            return this.element.getAttribute('prst-key') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "type", {
        get: function () {
            return this.element.getAttribute('prst-param-type') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "path", {
        get: function () {
            return this.element.getAttribute('prst-param-path') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "issuer", {
        get: function () {
            return this.element.getAttribute('prst-param-issuer') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "referenceId", {
        get: function () {
            return this.element.getAttribute('prst-reference-id') || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamIterable.prototype, "replacement", {
        get: function () {
            return this.element.outerHTML;
        },
        enumerable: true,
        configurable: true
    });
    return ParamIterable;
}());
exports.ParamIterable = ParamIterable;
var ParamsIterator = /** @class */ (function () {
    function ParamsIterator(data) {
        this.data = data.map(function (element, index) { return new ParamIterable(element, index); });
        this.index = 0;
    }
    Object.defineProperty(ParamsIterator.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    // Implement the `next()` method of the iterator protocol
    ParamsIterator.prototype.next = function () {
        if (this.index < this.data.length) {
            return { value: this.data[this.index++], done: false };
        }
        else {
            return { value: undefined, done: true };
        }
    };
    // Custom method to get the current value
    ParamsIterator.prototype.current = function () {
        if (this.index >= 0 && this.index < this.data.length) {
            return this.data[this.index];
        }
        return undefined;
    };
    ParamsIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return ParamsIterator;
}());
exports.ParamsIterator = ParamsIterator;
//# sourceMappingURL=params.iterator.js.map