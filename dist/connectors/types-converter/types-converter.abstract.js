"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPITypesConverter = void 0;
class VAPITypesConverter {
    convertingFunction = new Map();
    constructor() {
    }
    set(type, converter) {
        this.convertingFunction.set(type, converter);
        return this;
    }
    async convert(type, value) {
        const targetConverter = this.convertingFunction.get(type);
        if (targetConverter)
            return await targetConverter(value);
        else
            return value;
    }
}
exports.VAPITypesConverter = VAPITypesConverter;
//# sourceMappingURL=types-converter.abstract.js.map