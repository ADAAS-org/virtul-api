"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var moment_1 = __importDefault(require("moment"));
var task_types_1 = require("./task.types");
var task_constants_1 = require("./task.constants");
var events_1 = require("events");
var execution_constants_1 = require("../execution/execution.constants");
var task_errors_1 = require("./task.errors");
var uuid_1 = require("uuid");
var memory_abstract_1 = require("../memory/memory.abstract");
var types_converter_abstract_1 = require("../connectors/types-converter/types-converter.abstract");
var converters_default_1 = require("../connectors/types-converter/converters.default");
var VAPIExecutionTask = /** @class */ (function (_super) {
    __extends(VAPIExecutionTask, _super);
    function VAPIExecutionTask(params, config) {
        var _this = _super.call(this) || this;
        _this.id = uuid_1.v4();
        _this.status = 'PENDING';
        _this.memory = new memory_abstract_1.VAPITaskMemory();
        _this.converter = new types_converter_abstract_1.VAPITypesConverter()
            .set(converters_default_1.StringConverter.type, converters_default_1.StringConverter.converter)
            .set(converters_default_1.NumberConverter.type, converters_default_1.NumberConverter.converter)
            .set(converters_default_1.BooleanConverter.type, converters_default_1.BooleanConverter.converter)
            .set(converters_default_1.ArrayConverter.type, converters_default_1.ArrayConverter.converter)
            .set(converters_default_1.JSONConverter.type, converters_default_1.JSONConverter.converter);
        if (params && params.state === 'serialized')
            _this.fromJSON(params);
        else if (params && config) {
            _this.onCreateNew(params, config);
        }
        else {
            throw new task_errors_1.VAPIExecutionTaskError(_this, task_constants_1.DEFAULT_EXECUTION_TASK_ERRORS.INVALID_CONSTRUCTOR_PARAMETERS);
        }
        return _this;
    }
    VAPIExecutionTask.prototype.onCreateNew = function (params, config) {
        this.start = moment_1["default"]();
        this.params = params;
        this.config = config || task_constants_1.DEFAULT_EXECUTION_TASK_CONSTRUCTOR_CONFIG;
    };
    VAPIExecutionTask.prototype.emit = function (eventName, actionProps) {
        if (actionProps === void 0) { actionProps = {}; }
        var outProps = __assign(__assign({}, actionProps), { message: actionProps.message ? actionProps.message : eventName, date: moment_1["default"]().toISOString(), sync: actionProps.sync ? true : false, severity: actionProps.severity ? actionProps.severity : 'info', task: this });
        // To any listener if provided
        if (this.eventNames().includes('*'))
            _super.prototype.emit.call(this, '*', outProps);
        // otherwise 
        return _super.prototype.emit.call(this, eventName, outProps);
    };
    VAPIExecutionTask.prototype.on = function (eventName, listener) {
        _super.prototype.on.call(this, eventName, listener);
        return this;
    };
    VAPIExecutionTask.prototype.ready = function () {
        var _this = this;
        if (!this.readyPromise)
            this.readyPromise = new Promise(function (resolve, reject) { return _this.load()
                .then(function () { return resolve(true); })["catch"](reject); });
        return this.readyPromise;
    };
    VAPIExecutionTask.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
            });
        });
    };
    // should create a new Task in DB  with basic records
    VAPIExecutionTask.prototype.init = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
            });
        });
    };
    // Should compile everything before execution
    VAPIExecutionTask.prototype.compile = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
            });
        });
    };
    // Should execute a task using attached connector
    VAPIExecutionTask.prototype.execute = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
            });
        });
    };
    // ================================STATE CHANGING ACTIONS================================================
    //uses to mark task as completed and destroys it
    VAPIExecutionTask.prototype.complete = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.end = moment_1["default"]();
                this.status = 'COMPLETED';
                this.emit(task_types_1.VAPIExecutionTaskLifecycle.COMPLETED, {
                    payload: result
                });
                this.destroy();
                return [2 /*return*/];
            });
        });
    };
    //  uses to mark task as FAILED and destroys it 
    VAPIExecutionTask.prototype.failed = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.end = moment_1["default"]();
                this.status = 'FAILED';
                this.emit(task_types_1.VAPIExecutionTaskLifecycle.FAILED, {
                    error: error
                });
                this.destroy();
                throw error;
            });
        });
    };
    // Should destroy the task after execution.
    VAPIExecutionTask.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.removeAllListeners();
                return [2 /*return*/];
            });
        });
    };
    // ================================CONVERSION ACTIONS================================================
    // Will serialize current object to provide an ability to restore it
    VAPIExecutionTask.prototype.toJSON = function () {
        return {
            id: this.id,
            start: this.start.toISOString(),
            end: this.end ? this.end.toISOString() : undefined,
            status: this.status,
            params: this.params,
            config: this.config,
            state: 'serialized'
        };
    };
    // Will set all required properties based on the input
    VAPIExecutionTask.prototype.fromJSON = function (serialized) {
        this.id = serialized.id;
        this.status = serialized.status;
        this.start = moment_1["default"](serialized.start);
        this.end = serialized.end ? moment_1["default"](serialized.end) : undefined;
        this.config = serialized.config;
        this.params = serialized.params;
    };
    return VAPIExecutionTask;
}(events_1.EventEmitter));
exports.VAPIExecutionTask = VAPIExecutionTask;
//# sourceMappingURL=task.abstract.js.map