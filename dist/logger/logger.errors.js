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
var moment_1 = __importDefault(require("moment"));
var VAPILoggerError = /** @class */ (function (_super) {
    __extends(VAPILoggerError, _super);
    function VAPILoggerError(params, originalError) {
        var _this = _super.call(this, params.message) || this;
        _this.name = params.name;
        _this.code = params.code;
        _this.description = params.description;
        _this.originalError = originalError;
        _this.date = moment_1["default"]().toISOString();
        return _this;
    }
    Object.defineProperty(VAPILoggerError.prototype, "compilingData", {
        get: function () {
            return {
                name: this.name,
                code: this.code,
                description: this.description,
                message: this.message,
                date: this.date
            };
        },
        enumerable: true,
        configurable: true
    });
    return VAPILoggerError;
}(Error));
exports.VAPILoggerError = VAPILoggerError;
//# sourceMappingURL=logger.errors.js.map