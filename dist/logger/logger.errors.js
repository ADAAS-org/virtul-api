"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPILoggerError = void 0;
const moment_1 = __importDefault(require("moment"));
class VAPILoggerError extends Error {
    date;
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
        this.date = (0, moment_1.default)().toISOString();
    }
    get compilingData() {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            date: this.date
        };
    }
}
exports.VAPILoggerError = VAPILoggerError;
//# sourceMappingURL=logger.errors.js.map