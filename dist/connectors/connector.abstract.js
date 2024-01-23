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
var connector_contsants_1 = require("./connector.contsants");
var connector_errors_1 = require("./connector.errors");
var uuid_1 = require("uuid");
var stream_1 = require("stream");
var moment_1 = __importDefault(require("moment"));
var VAPIConnector = /** @class */ (function (_super) {
    __extends(VAPIConnector, _super);
    function VAPIConnector(config) {
        var _this = _super.call(this) || this;
        _this.variables = new Map();
        _this.id = uuid_1.v4();
        _this.config = config;
        return _this;
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
    VAPIConnector.prototype.emit = function (eventName, actionProps) {
        if (actionProps === void 0) { actionProps = {}; }
        var outProps = __assign(__assign({}, actionProps), { message: actionProps.message ? actionProps.message : eventName, date: moment_1["default"]().toISOString(), severity: actionProps.severity ? actionProps.severity : 'info', connector: this });
        // To any listener if provided
        if (this.eventNames().includes('*'))
            _super.prototype.emit.call(this, '*', outProps);
        // otherwise 
        return _super.prototype.emit.call(this, eventName, outProps);
    };
    VAPIConnector.prototype.on = function (eventName, listener) {
        _super.prototype.on.call(this, eventName, listener);
        return this;
    };
    // there connector should use prompt to call API
    VAPIConnector.prototype.execute = function (request, extras) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new connector_errors_1.VAPIConnectorError(this, connector_contsants_1.DEFAULT_CONNECTOR_ERRORS.METHOD_NOT_IMPLEMENTED);
            });
        });
    };
    VAPIConnector.prototype.toJSON = function () {
        return {
            id: this.id,
            config: this.config
        };
    };
    return VAPIConnector;
}(stream_1.EventEmitter));
exports.VAPIConnector = VAPIConnector;
//# sourceMappingURL=connector.abstract.js.map