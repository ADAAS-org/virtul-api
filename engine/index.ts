export { ParamsParser } from './parsers/params.parser'
export { ParamIterable, ParamsIterator } from './parsers/params.iterator'
// export * as ParsersTypes from './engine/parsers/parser.types'


// =======Connectors=======
// Wrappers on top of protocols e.g. HTTP
export { VAPIConnector } from './connectors/connector.abstract';
export * from './connectors/connectors-types';
export { VAPIConnectorError } from './connectors/connector.errors';
export { VAPIConnectorsManager } from './connectors/connector.manager';
import {
    IVAPIConnectorVariable,
    IVAPIMarkupVariable,
    VAPIConnectorParamsMappingObject,
    IVAPIConnectorExecuteAddons
} from './connectors/connector.types';

export {
    IVAPIConnectorVariable,
    IVAPIMarkupVariable,
    VAPIConnectorParamsMappingObject,
    IVAPIConnectorExecuteAddons
}


// =======Execution=======
// Control on top of the execution process, routing, connections, etc. 
export { VAPIExecutionManager } from './execution/execution.manager';
export { VAPIExecutionError } from './execution/execution.error';
export * as EXECUTION_CONSTANTS from './execution/execution.constants';
export * as VAPIExecutionTypes from './execution/execution.types';


// =======Loggers=======
// A wrapper on top of possible loggers and listeners
export { VAPILogger } from './logger/logger.abstract';
export { VAPILoggerError } from './logger/logger.errors';
export * as VAPILoggerTypes from './logger/logger.types';


// =======Task=======
// A wrapper on top of possible loggers and listeners
export { VAPIExecutionTask } from './tasks/task.abstract';
export { VAPIExecutionTaskError } from './tasks/task.errors';
export * as TASK_CONSTANTS from './tasks/task.constants';
export {
    IVAPIExecutionTaskConstructorConfig,
    IVAPISerializedExecutionTask,
    IVAPIExecutionTaskOnProps,
    IVAPIExecutionTaskEmitProps
} from './tasks/task.types';


// =======Errors=======
export { VAPIError } from './error/error.abstract'


// =======Memory=======
export { VAPITaskMemory } from './memory/memory.abstract'
export { IVAPISerializedTaskMemory } from './memory/memory.types'



// SHARED

export {
    Dictionary as VAPIDictionary
} from './shared/types'