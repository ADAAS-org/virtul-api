"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIConnectorActions = void 0;
var VAPIConnectorActions;
(function (VAPIConnectorActions) {
    // EXECUTION STATE
    VAPIConnectorActions["EXECUTION_STARTED"] = "VAPI_TASK_EXECUTION_STARTED";
    VAPIConnectorActions["EXECUTION_IN_PROGRESS"] = "VAPI_TASK_EXECUTION_IN_PROGRESS";
    VAPIConnectorActions["EXECUTION_WAITING"] = "EXECUTION_WAITING";
    VAPIConnectorActions["EXECUTION_FAILED"] = "VAPI_TASK_EXECUTION_FAILED";
    // FINAL STATES
    VAPIConnectorActions["FAILED"] = "VAPI_TASK_FAILED";
    VAPIConnectorActions["COMPLETED"] = "VAPI_TASK_COMPLETED";
})(VAPIConnectorActions = exports.VAPIConnectorActions || (exports.VAPIConnectorActions = {}));
//# sourceMappingURL=connector.types.js.map