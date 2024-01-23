"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EXECUTION_TASK_CONSTRUCTOR_CONFIG = exports.DEFAULT_EXECUTION_TASK_ERRORS = exports.DEFAULT_EXECUTION_TASK_MESSAGES = void 0;
exports.DEFAULT_EXECUTION_TASK_MESSAGES = {
    LOAD_FROM_DB_STARTED: 'Loading related data from Storage...',
    LOAD_FROM_DB_COMPLETED: 'Loading successfully finished.'
};
exports.DEFAULT_EXECUTION_TASK_ERRORS = {
    METHOD_NOT_IMPLEMENTED: {
        name: 'METHOD_NOT_IMPLEMENTED',
        code: 'VAPI-EXECUTION-ERR-0000',
        message: 'Called method is not implemented',
        description: 'Please make sure that the method you\'re calling is implemented',
    },
    IMPOSSIBLE_TO_LOAD_PROMPT_OR_CONNECTOR: {
        name: 'IMPOSSIBLE_TO_LOAD_PROMPT_OR_CONNECTOR',
        code: 'VAPI-EXECUTION-ERR-0001',
        message: 'Impossible to load prompt or connector from DB',
        description: 'During data load from DB prompt, or connector entity was not found.',
    },
    INVALID_CONSTRUCTOR_PARAMETERS: {
        name: 'INVALID_TASK_CONSTRUCTOR_PARAMETERS',
        code: 'VAPI-EXECUTION-ERR-0002',
        message: 'A set of parameters passed to the constructor is invalid',
        description: 'Please make sure that all parameters passed correctly',
    },
};
exports.DEFAULT_EXECUTION_TASK_CONSTRUCTOR_CONFIG = {};
//# sourceMappingURL=task.constants.js.map