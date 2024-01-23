"use strict";
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
exports.__esModule = true;
var params_parser_1 = require("../../parsers/params.parser");
var VAPIConnectorsParamsHelper = /** @class */ (function () {
    function VAPIConnectorsParamsHelper() {
    }
    VAPIConnectorsParamsHelper.fillInByMarkup = function (markup, connectorParameters, memory, mapping) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var out, parser, _loop_1, parser_1, parser_1_1, variable, e_1_1;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        out = markup;
                        console.log('fillParams: START');
                        parser = new params_parser_1.ParamsParser().extract(markup);
                        _loop_1 = function (variable) {
                            var parameterDefinition, source, requestValue;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        parameterDefinition = connectorParameters.get(variable.referenceId);
                                        if (!parameterDefinition) return [3 /*break*/, 2];
                                        console.log('parameterDefinition.id: ', parameterDefinition.id);
                                        source = mapping && mapping.length ? (_a = mapping.find(function (mp) { return mp.target.id === parameterDefinition.id; })) === null || _a === void 0 ? void 0 : _a.source : undefined;
                                        return [4 /*yield*/, memory.get(source ? source : parameterDefinition)];
                                    case 1:
                                        requestValue = _a.sent();
                                        console.log('requestValue: ', requestValue);
                                        out = out.replace(variable.replacement, requestValue
                                            ? typeof requestValue === 'string' ? requestValue.replace(/\n/ig, '\\n').replace(/\"/ig, '\\"') :
                                                requestValue
                                            : parameterDefinition.value);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        parser_1 = __values(parser), parser_1_1 = parser_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!parser_1_1.done) return [3 /*break*/, 5];
                        variable = parser_1_1.value;
                        return [5 /*yield**/, _loop_1(variable)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        parser_1_1 = parser_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (parser_1_1 && !parser_1_1.done && (_b = parser_1["return"])) _b.call(parser_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        console.log('out: ', out);
                        return [2 /*return*/, out ? JSON.parse(out) : {}];
                }
            });
        });
    };
    return VAPIConnectorsParamsHelper;
}());
exports.VAPIConnectorsParamsHelper = VAPIConnectorsParamsHelper;
//# sourceMappingURL=Params.herlper.js.map