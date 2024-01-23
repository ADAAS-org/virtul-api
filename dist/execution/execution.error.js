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
var error_abstract_1 = require("../error/error.abstract");
var VAPIExecutionError = /** @class */ (function (_super) {
    __extends(VAPIExecutionError, _super);
    function VAPIExecutionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VAPIExecutionError;
}(error_abstract_1.VAPIError));
exports.VAPIExecutionError = VAPIExecutionError;
//# sourceMappingURL=execution.error.js.map