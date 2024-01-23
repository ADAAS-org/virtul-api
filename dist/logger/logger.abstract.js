"use strict";
exports.__esModule = true;
var logger_errors_1 = require("./logger.errors");
var logger_constants_1 = require("./logger.constants");
var VAPILogger = /** @class */ (function () {
    function VAPILogger(name) {
        this.name = name;
    }
    VAPILogger.prototype.asyncLog = function (severity, error) {
        throw new logger_errors_1.VAPILoggerError(logger_constants_1.DEFAULT_LOGGER_MANAGER_ERRORS.METHOD_NOT_IMPLEMENTED);
    };
    VAPILogger.prototype.syncLog = function (severity, data) {
        throw new logger_errors_1.VAPILoggerError(logger_constants_1.DEFAULT_LOGGER_MANAGER_ERRORS.METHOD_NOT_IMPLEMENTED);
    };
    return VAPILogger;
}());
exports.VAPILogger = VAPILogger;
//# sourceMappingURL=logger.abstract.js.map