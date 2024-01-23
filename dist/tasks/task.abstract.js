"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIExecutionTask = void 0;
const moment_1 = __importDefault(require("moment"));
const task_types_1 = require("./task.types");
const task_constants_1 = require("./task.constants");
const events_1 = require("events");
const execution_constants_1 = require("../execution/execution.constants");
const task_errors_1 = require("./task.errors");
const uuid_1 = require("uuid");
const memory_abstract_1 = require("../memory/memory.abstract");
const types_converter_abstract_1 = require("../connectors/types-converter/types-converter.abstract");
const converters_default_1 = require("../connectors/types-converter/converters.default");
class VAPIExecutionTask extends events_1.EventEmitter {
    start;
    end;
    id = (0, uuid_1.v4)();
    status = 'PENDING';
    params;
    config;
    memory = new memory_abstract_1.VAPITaskMemory();
    converter = new types_converter_abstract_1.VAPITypesConverter()
        .set(converters_default_1.StringConverter.type, converters_default_1.StringConverter.converter)
        .set(converters_default_1.NumberConverter.type, converters_default_1.NumberConverter.converter)
        .set(converters_default_1.BooleanConverter.type, converters_default_1.BooleanConverter.converter)
        .set(converters_default_1.ArrayConverter.type, converters_default_1.ArrayConverter.converter)
        .set(converters_default_1.JSONConverter.type, converters_default_1.JSONConverter.converter);
    readyPromise;
    constructor(params, config) {
        super();
        if (params && params.state === 'serialized')
            this.fromJSON(params);
        else if (params && config) {
            this.onCreateNew(params, config);
        }
        else {
            throw new task_errors_1.VAPIExecutionTaskError(this, task_constants_1.DEFAULT_EXECUTION_TASK_ERRORS.INVALID_CONSTRUCTOR_PARAMETERS);
        }
    }
    onCreateNew(params, config) {
        this.start = (0, moment_1.default)();
        this.params = params;
        this.config = config || task_constants_1.DEFAULT_EXECUTION_TASK_CONSTRUCTOR_CONFIG;
    }
    emit(eventName, actionProps = {}) {
        const outProps = {
            ...actionProps,
            message: actionProps.message ? actionProps.message : eventName,
            date: (0, moment_1.default)().toISOString(),
            sync: actionProps.sync ? true : false,
            severity: actionProps.severity ? actionProps.severity : 'info',
            task: this
        };
        // To any listener if provided
        if (this.eventNames().includes('*'))
            super.emit('*', outProps);
        // otherwise 
        return super.emit(eventName, outProps);
    }
    on(eventName, listener) {
        super.on(eventName, listener);
        return this;
    }
    ready() {
        if (!this.readyPromise)
            this.readyPromise = new Promise((resolve, reject) => this.load()
                .then(() => resolve(true))
                .catch(reject));
        return this.readyPromise;
    }
    async load() {
        throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
    // should create a new Task in DB  with basic records
    async init(...props) {
        throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
    // Should compile everything before execution
    async compile(...props) {
        throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
    // Should execute a task using attached connector
    async execute(...props) {
        throw new task_errors_1.VAPIExecutionTaskError(this, execution_constants_1.DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
    // ================================STATE CHANGING ACTIONS================================================
    //uses to mark task as completed and destroys it
    async complete(result) {
        this.end = (0, moment_1.default)();
        this.status = 'COMPLETED';
        this.emit(task_types_1.VAPIExecutionTaskLifecycle.COMPLETED, {
            payload: result
        });
        this.destroy();
    }
    //  uses to mark task as FAILED and destroys it 
    async failed(error) {
        this.end = (0, moment_1.default)();
        this.status = 'FAILED';
        this.emit(task_types_1.VAPIExecutionTaskLifecycle.FAILED, {
            error
        });
        this.destroy();
        throw error;
    }
    // Should destroy the task after execution.
    async destroy() {
        this.removeAllListeners();
    }
    // ================================CONVERSION ACTIONS================================================
    // Will serialize current object to provide an ability to restore it
    toJSON() {
        return {
            id: this.id,
            start: this.start.toISOString(),
            end: this.end ? this.end.toISOString() : undefined,
            status: this.status,
            params: this.params,
            config: this.config,
            state: 'serialized'
        };
    }
    // Will set all required properties based on the input
    fromJSON(serialized) {
        this.id = serialized.id;
        this.status = serialized.status;
        this.start = (0, moment_1.default)(serialized.start);
        this.end = serialized.end ? (0, moment_1.default)(serialized.end) : undefined;
        this.config = serialized.config;
        this.params = serialized.params;
    }
}
exports.VAPIExecutionTask = VAPIExecutionTask;
//# sourceMappingURL=task.abstract.js.map