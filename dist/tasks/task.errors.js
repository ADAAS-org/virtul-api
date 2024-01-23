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
var VAPIExecutionTaskError = /** @class */ (function (_super) {
    __extends(VAPIExecutionTaskError, _super);
    function VAPIExecutionTaskError(task, params, originalError) {
        var _this = _super.call(this, params) || this;
        _this.task = task;
        _this.name = params.name;
        _this.code = params.code;
        _this.description = params.description;
        _this.originalError = originalError;
        return _this;
    }
    VAPIExecutionTaskError.prototype.toJSON = function () {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            task: this.task.toJSON()
        };
    };
    return VAPIExecutionTaskError;
}(error_abstract_1.VAPIError));
exports.VAPIExecutionTaskError = VAPIExecutionTaskError;
//# sourceMappingURL=task.errors.js.map