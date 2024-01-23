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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var connector_types_1 = require("../connector.types");
var converters_default_1 = require("../types-converter/converters.default");
var connector_abstract_1 = require("../connector.abstract");
var connector_errors_1 = require("../connector.errors");
var connector_contsants_1 = require("../connector.contsants");
var params_parser_1 = require("../../parsers/params.parser");
var Params_herlper_1 = require("../helpers/Params.herlper");
var axios_1 = __importStar(require("axios"));
var types_converter_abstract_1 = require("../types-converter/types-converter.abstract");
var lodash_1 = __importDefault(require("lodash"));
var VAPIHTTPConnector = /** @class */ (function (_super) {
    __extends(VAPIHTTPConnector, _super);
    function VAPIHTTPConnector(config) {
        var _this = _super.call(this, config) || this;
        _this.bodyMethods = ['post', 'put'];
        _this.nonBodyMethods = ['get', 'delete'];
        config
            .parameters
            .forEach(function (el) { return _this.variables.set(el.id, el); });
        return _this;
    }
    // there connector should use prompt to call API
    VAPIHTTPConnector.prototype.execute = function (request, extras) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, converter, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.apiCall(request, extras)];
                    case 1:
                        response = _b.sent();
                        converter = extras.converter ? extras.converter : new types_converter_abstract_1.VAPITypesConverter()
                            .set(converters_default_1.StringConverter.type, converters_default_1.StringConverter.converter)
                            .set(converters_default_1.NumberConverter.type, converters_default_1.NumberConverter.converter)
                            .set(converters_default_1.BooleanConverter.type, converters_default_1.BooleanConverter.converter)
                            .set(converters_default_1.ArrayConverter.type, converters_default_1.ArrayConverter.converter)
                            .set(converters_default_1.JSONConverter.type, converters_default_1.JSONConverter.converter);
                        return [4 /*yield*/, this.responseProcessing(response, converter)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1 instanceof axios_1.AxiosError) {
                            console.log('error data: ', (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                            throw new connector_errors_1.VAPIConnectorError(this, connector_contsants_1.DEFAULT_CONNECTOR_ERRORS.REMOTE_API_ERROR, error_1);
                        }
                        else
                            throw error_1;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VAPIHTTPConnector.prototype.apiCall = function (request, extras) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, params, body, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Params_herlper_1.VAPIConnectorsParamsHelper.fillInByMarkup(this.config.headers, this.variables, request, extras.mapping)];
                    case 1:
                        headers = _b.sent();
                        return [4 /*yield*/, Params_herlper_1.VAPIConnectorsParamsHelper.fillInByMarkup(this.config.params, this.variables, request, extras.mapping)];
                    case 2:
                        params = _b.sent();
                        if (!this.config.body) return [3 /*break*/, 4];
                        return [4 /*yield*/, Params_herlper_1.VAPIConnectorsParamsHelper.fillInByMarkup(this.config.body, this.variables, request, extras.mapping)];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = undefined;
                        _b.label = 5;
                    case 5:
                        body = _a;
                        this.emit(connector_types_1.VAPIConnectorActions.EXECUTION_IN_PROGRESS, {
                            message: "Trying to execute... " + this.config.method + " :: " + this.config.url,
                            payload: {
                                headers: headers,
                                params: params,
                                body: body
                            }
                        });
                        if (!this.bodyMethods.includes(this.config.method)) return [3 /*break*/, 7];
                        return [4 /*yield*/, axios_1["default"][this.config.method](this.config.url, body, {
                                headers: headers,
                                params: params
                            })];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: return [4 /*yield*/, axios_1["default"][this.config.method](this.config.url, {
                            headers: headers,
                            params: params
                        })];
                    case 8: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    VAPIHTTPConnector.prototype.responseProcessing = function (originalResponse, converter) {
        return __awaiter(this, void 0, void 0, function () {
            var out, parser, _a, parsed, replacement, _loop_1, _b, _c, variable, e_1_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        out = {
                            original: originalResponse,
                            result: {}
                        };
                        parser = new params_parser_1.ParamsParser();
                        _a = parser.getJSON(this.config.response), parsed = _a.parsed, replacement = _a.replacement;
                        _loop_1 = function (variable) {
                            var target, responsePath, targetValue;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        target = replacement.find(function (rep) { return rep.span.id === variable.id; });
                                        if (!target) return [3 /*break*/, 2];
                                        responsePath = parser.getPropertyPath(parsed, target.key);
                                        if (!responsePath) return [3 /*break*/, 2];
                                        targetValue = lodash_1["default"].get(originalResponse.data, responsePath);
                                        return [4 /*yield*/, converter.convert(variable.type, targetValue)];
                                    case 1:
                                        targetValue = _a.sent();
                                        lodash_1["default"].set(out.result, variable.id, targetValue);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        _b = __values(parser.extract(this.config.response)), _c = _b.next();
                        _e.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 5];
                        variable = _c.value;
                        return [5 /*yield**/, _loop_1(variable)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_d = _b["return"])) _d.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, out];
                }
            });
        });
    };
    return VAPIHTTPConnector;
}(connector_abstract_1.VAPIConnector));
exports.VAPIHTTPConnector = VAPIHTTPConnector;
//# sourceMappingURL=http.connector.js.map