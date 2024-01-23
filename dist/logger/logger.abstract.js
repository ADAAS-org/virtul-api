"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPILogger = void 0;
const logger_errors_1 = require("./logger.errors");
const logger_constants_1 = require("./logger.constants");
class VAPILogger {
    name;
    constructor(name) {
        this.name = name;
    }
    asyncLog(severity, error) {
        throw new logger_errors_1.VAPILoggerError(logger_constants_1.DEFAULT_LOGGER_MANAGER_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
    syncLog(severity, data) {
        throw new logger_errors_1.VAPILoggerError(logger_constants_1.DEFAULT_LOGGER_MANAGER_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
}
exports.VAPILogger = VAPILogger;
//# sourceMappingURL=logger.abstract.js.map