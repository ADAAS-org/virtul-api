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
exports.__esModule = true;
var VAPIError = /** @class */ (function (_super) {
    __extends(VAPIError, _super);
    function VAPIError(params, originalError) {
        var _this = _super.call(this, params.message) || this;
        _this.name = params.name;
        _this.code = params.code;
        _this.description = params.description;
        _this.originalError = originalError;
        return _this;
    }
    VAPIError.prototype.toJSON = function () {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            originalError: this.originalError
        };
    };
    return VAPIError;
}(Error));
exports.VAPIError = VAPIError;
//# sourceMappingURL=error.abstract.js.map