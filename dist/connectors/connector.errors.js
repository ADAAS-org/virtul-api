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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = require("axios");
var error_abstract_1 = require("../error/error.abstract");
var lodash_1 = __importDefault(require("lodash"));
var VAPIConnectorError = /** @class */ (function (_super) {
    __extends(VAPIConnectorError, _super);
    function VAPIConnectorError(connector, params, originalError) {
        var _this = _super.call(this, params) || this;
        _this.connector = connector;
        _this.name = params.name;
        _this.code = params.code;
        _this.description = params.description;
        if (originalError && originalError instanceof axios_1.AxiosError) {
            _this.name = lodash_1["default"].get(originalError, 'response.data.name')
                ? lodash_1["default"].get(originalError, 'response.data.name')
                : lodash_1["default"].get(originalError, 'response.data.error.message')
                    ? lodash_1["default"].get(originalError, 'response.data.error.message')
                    : lodash_1["default"].get(originalError, 'name')
                        ? lodash_1["default"].get(originalError, 'name')
                        : lodash_1["default"].get(originalError, 'message')
                            ? lodash_1["default"].get(originalError, 'message')
                            : _this.name;
            _this.code = lodash_1["default"].get(originalError, 'response.data.code')
                ? lodash_1["default"].get(originalError, 'response.data.code')
                : lodash_1["default"].get(originalError, 'code')
                    ? lodash_1["default"].get(originalError, 'code')
                    : lodash_1["default"].get(originalError, 'type')
                        ? lodash_1["default"].get(originalError, 'type')
                        : _this.code;
            _this.description =
                lodash_1["default"].get(originalError, 'response.data.description')
                    ? lodash_1["default"].get(originalError, 'response.data.description')
                    : _this.description;
        }
        _this.originalError = originalError;
        return _this;
    }
    VAPIConnectorError.prototype.toJSON = function () {
        var _a;
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            connector: this.connector.toJSON(),
            originalError: {
                name: this.originalError instanceof Error ? {
                    name: this.originalError.name,
                    message: this.originalError.message
                } : this.originalError instanceof axios_1.AxiosError ? {
                    code: this.originalError.code,
                    name: this.originalError.name,
                    status: this.originalError.status,
                    response: (_a = this.originalError.response) === null || _a === void 0 ? void 0 : _a.data
                } : this.originalError
            }
        };
    };
    return VAPIConnectorError;
}(error_abstract_1.VAPIError));
exports.VAPIConnectorError = VAPIConnectorError;
//# sourceMappingURL=connector.errors.js.map