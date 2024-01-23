"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONConverter = exports.ArrayConverter = exports.BooleanConverter = exports.NumberConverter = exports.StringConverter = void 0;
exports.StringConverter = {
    type: 'string',
    converter: async (value) => {
        if (typeof (value) === 'object')
            return JSON.stringify(value);
        else
            return String(value);
    }
};
exports.NumberConverter = {
    type: 'number',
    converter: async (value) => {
        return Number(value);
    }
};
exports.BooleanConverter = {
    type: 'boolean',
    converter: async (value) => {
        return !!(value);
    }
};
exports.ArrayConverter = {
    type: 'array',
    converter: async (value) => {
        switch (typeof value) {
            case 'string':
                try {
                    return JSON.parse(value);
                }
                catch (error) {
                    return value;
                }
            default:
                return value;
        }
    }
};
exports.JSONConverter = {
    type: 'json',
    converter: async (value) => {
        switch (typeof value) {
            case 'string':
                try {
                    return JSON.parse(value);
                }
                catch (error) {
                    return value;
                }
            default:
                return value;
        }
    }
};
//# sourceMappingURL=converters.default.js.map