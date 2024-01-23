"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIError = void 0;
class VAPIError extends Error {
    name;
    code;
    description;
    originalError;
    constructor(params, originalError) {
        super(params.message);
        this.name = params.name;
        this.code = params.code;
        this.description = params.description;
        this.originalError = originalError;
    }
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            originalError: this.originalError
        };
    }
}
exports.VAPIError = VAPIError;
//# sourceMappingURL=error.abstract.js.map