"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIExecutionTaskLifecycle = void 0;
var VAPIExecutionTaskLifecycle;
(function (VAPIExecutionTaskLifecycle) {
    // INIT STATE
    VAPIExecutionTaskLifecycle["INIT_STARTED"] = "VAPI_TASK_INIT_STARTED";
    VAPIExecutionTaskLifecycle["INIT_IN_PROGRESS"] = "VAPI_TASK_INIT_IN_PROGRESS";
    VAPIExecutionTaskLifecycle["INIT_COMPLETED"] = "VAPI_TASK_INIT_COMPLETED";
    VAPIExecutionTaskLifecycle["INIT_FAILED"] = "VAPI_TASK_INIT_FAILED";
    // COMPILE STATE
    VAPIExecutionTaskLifecycle["COMPILE_STARTED"] = "VAPI_TASK_COMPILE_STARTED";
    VAPIExecutionTaskLifecycle["COMPILE_IN_PROGRESS"] = "VAPI_TASK_COMPILE_IN_PROGRESS";
    VAPIExecutionTaskLifecycle["COMPILE_COMPLETED"] = "VAPI_TASK_COMPILE_COMPLETED";
    VAPIExecutionTaskLifecycle["COMPILE_FAILED"] = "VAPI_TASK_COMPILE_FAILED";
    // EXECUTION STATE
    VAPIExecutionTaskLifecycle["EXECUTION_STARTED"] = "VAPI_TASK_EXECUTION_STARTED";
    VAPIExecutionTaskLifecycle["EXECUTION_IN_PROGRESS"] = "VAPI_TASK_EXECUTION_IN_PROGRESS";
    VAPIExecutionTaskLifecycle["EXECUTION_WAITING"] = "EXECUTION_WAITING";
    VAPIExecutionTaskLifecycle["EXECUTION_FAILED"] = "VAPI_TASK_EXECUTION_FAILED";
    // FINAL STATES
    VAPIExecutionTaskLifecycle["FAILED"] = "VAPI_TASK_FAILED";
    VAPIExecutionTaskLifecycle["COMPLETED"] = "VAPI_TASK_COMPLETED";
})(VAPIExecutionTaskLifecycle = exports.VAPIExecutionTaskLifecycle || (exports.VAPIExecutionTaskLifecycle = {}));
//# sourceMappingURL=task.types.js.map