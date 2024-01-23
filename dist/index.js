"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPITypesConverter = exports.VAPITaskMemory = exports.VAPIError = exports.TASK_CONSTANTS = exports.VAPIExecutionTaskError = exports.VAPIExecutionTask = exports.VAPILoggerTypes = exports.VAPILoggerError = exports.VAPILogger = exports.VAPIExecutionTypes = exports.EXECUTION_CONSTANTS = exports.VAPIExecutionError = exports.VAPIExecutionManager = exports.VAPIConnectorsManager = exports.VAPIConnectorError = exports.VAPIConnector = exports.ParamsIterator = exports.ParamIterable = exports.ParamsParser = void 0;
var params_parser_1 = require("./parsers/params.parser");
Object.defineProperty(exports, "ParamsParser", { enumerable: true, get: function () { return params_parser_1.ParamsParser; } });
var params_iterator_1 = require("./parsers/params.iterator");
Object.defineProperty(exports, "ParamIterable", { enumerable: true, get: function () { return params_iterator_1.ParamIterable; } });
Object.defineProperty(exports, "ParamsIterator", { enumerable: true, get: function () { return params_iterator_1.ParamsIterator; } });
// export * as ParsersTypes from './engine/parsers/parser.types'
// =======Connectors=======
// Wrappers on top of protocols e.g. HTTP
var connector_abstract_1 = require("./connectors/connector.abstract");
Object.defineProperty(exports, "VAPIConnector", { enumerable: true, get: function () { return connector_abstract_1.VAPIConnector; } });
__exportStar(require("./connectors/connectors-types"), exports);
var connector_errors_1 = require("./connectors/connector.errors");
Object.defineProperty(exports, "VAPIConnectorError", { enumerable: true, get: function () { return connector_errors_1.VAPIConnectorError; } });
var connector_manager_1 = require("./connectors/connector.manager");
Object.defineProperty(exports, "VAPIConnectorsManager", { enumerable: true, get: function () { return connector_manager_1.VAPIConnectorsManager; } });
// =======Execution=======
// Control on top of the execution process, routing, connections, etc. 
var execution_manager_1 = require("./execution/execution.manager");
Object.defineProperty(exports, "VAPIExecutionManager", { enumerable: true, get: function () { return execution_manager_1.VAPIExecutionManager; } });
var execution_error_1 = require("./execution/execution.error");
Object.defineProperty(exports, "VAPIExecutionError", { enumerable: true, get: function () { return execution_error_1.VAPIExecutionError; } });
exports.EXECUTION_CONSTANTS = __importStar(require("./execution/execution.constants"));
exports.VAPIExecutionTypes = __importStar(require("./execution/execution.types"));
// =======Loggers=======
// A wrapper on top of possible loggers and listeners
var logger_abstract_1 = require("./logger/logger.abstract");
Object.defineProperty(exports, "VAPILogger", { enumerable: true, get: function () { return logger_abstract_1.VAPILogger; } });
var logger_errors_1 = require("./logger/logger.errors");
Object.defineProperty(exports, "VAPILoggerError", { enumerable: true, get: function () { return logger_errors_1.VAPILoggerError; } });
exports.VAPILoggerTypes = __importStar(require("./logger/logger.types"));
// =======Task=======
// A wrapper on top of possible loggers and listeners
var task_abstract_1 = require("./tasks/task.abstract");
Object.defineProperty(exports, "VAPIExecutionTask", { enumerable: true, get: function () { return task_abstract_1.VAPIExecutionTask; } });
var task_errors_1 = require("./tasks/task.errors");
Object.defineProperty(exports, "VAPIExecutionTaskError", { enumerable: true, get: function () { return task_errors_1.VAPIExecutionTaskError; } });
exports.TASK_CONSTANTS = __importStar(require("./tasks/task.constants"));
// =======Errors=======
var error_abstract_1 = require("./error/error.abstract");
Object.defineProperty(exports, "VAPIError", { enumerable: true, get: function () { return error_abstract_1.VAPIError; } });
// =======Memory=======
var memory_abstract_1 = require("./memory/memory.abstract");
Object.defineProperty(exports, "VAPITaskMemory", { enumerable: true, get: function () { return memory_abstract_1.VAPITaskMemory; } });
// =======Types Convertors=======
var types_converter_abstract_1 = require("./connectors/types-converter/types-converter.abstract");
Object.defineProperty(exports, "VAPITypesConverter", { enumerable: true, get: function () { return types_converter_abstract_1.VAPITypesConverter; } });
__exportStar(require("./connectors/types-converter/converters.default"), exports);
//# sourceMappingURL=index.js.map