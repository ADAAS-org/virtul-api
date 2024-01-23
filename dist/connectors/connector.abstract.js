"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIConnector = void 0;
const connector_contsants_1 = require("./connector.contsants");
const connector_errors_1 = require("./connector.errors");
const uuid_1 = require("uuid");
const stream_1 = require("stream");
const moment_1 = __importDefault(require("moment"));
class VAPIConnector extends stream_1.EventEmitter {
    id;
    variables = new Map();
    config;
    constructor(config) {
        super();
        this.id = (0, uuid_1.v4)();
        this.config = config;
        // [
        //     ...this.config.credentials.map(el => ({
        //         ...el,
        //         issuer: 'credentials'
        //     }) as IVAPIConnectorVariable),
        //     ...this.config.proxy.map(el => ({
        //         ...el,
        //         issuer: 'proxy'
        //     }) as IVAPIConnectorVariable)
        // ]
        //     .forEach(el => this.variables.set(el.id, el))
    }
    emit(eventName, actionProps = {}) {
        const outProps = {
            ...actionProps,
            message: actionProps.message ? actionProps.message : eventName,
            date: (0, moment_1.default)().toISOString(),
            severity: actionProps.severity ? actionProps.severity : 'info',
            connector: this
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
    // there connector should use prompt to call API
    async execute(request, extras) {
        throw new connector_errors_1.VAPIConnectorError(this, connector_contsants_1.DEFAULT_CONNECTOR_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
    toJSON() {
        return {
            id: this.id,
            config: this.config
        };
    }
}
exports.VAPIConnector = VAPIConnector;
//# sourceMappingURL=connector.abstract.js.map