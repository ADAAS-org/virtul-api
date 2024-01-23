"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIExecutionTaskError = void 0;
const error_abstract_1 = require("../error/error.abstract");
class VAPIExecutionTaskError extends error_abstract_1.VAPIError {
    name;
    code;
    description;
    originalError;
    task;
    constructor(task, params, originalError) {
        super(params);
        this.task = task;
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
            task: this.task.toJSON()
        };
    }
}
exports.VAPIExecutionTaskError = VAPIExecutionTaskError;
//# sourceMappingURL=task.errors.js.map