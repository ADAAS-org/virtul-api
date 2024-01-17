import { VAPIExecutionTask } from "./task.abstract";
import { VAPIConnector } from "../connectors/connector.abstract";
import { IVAPIError, IVAPISerializedError } from "../error/error.types";


export interface IVAPIExecutionTaskError extends IVAPIError {
    task: VAPIExecutionTask<VAPIExecutionTaskLifecycle>
}

export interface IVAPIExecutionTaskSerializedError extends IVAPISerializedError {
    task: IVAPISerializedExecutionTask
}


// This is a common set of configurations 
export interface IVAPIExecutionTaskConstructorConfig {
    
}

export interface IVAPISerializedExecutionTask {
    id: string,
    start: string,
    end?: string,
    status: string | any
    compiledPrompt?: string,
    params: any,
    config: IVAPIExecutionTaskConstructorConfig,
    state: 'serialized'
}


export interface IVAPIExecutionTaskEmitProps {
    severity?: 'error' | 'info' | 'warning',
    sync?: boolean,
    connector?: VAPIConnector,
    message?: string,
    error?: IVAPIError | Error,
    payload?: any

    // TODO: add addons
    addon?: any,
}

export interface IVAPIExecutionTaskOnProps<T extends string> {
    severity?: 'error' | 'info' | 'warning',
    date: string,
    sync: boolean,
    task: VAPIExecutionTask<T>,
    message: string,
    connector?: VAPIConnector,
    error?: IVAPIError | Error,
    payload?: any

    // TODO: add addons
    addon?: any,
}


export enum VAPIExecutionTaskLifecycle {
    // INIT STATE
    INIT_STARTED = 'VAPI_TASK_INIT_STARTED',
    INIT_IN_PROGRESS = 'VAPI_TASK_INIT_IN_PROGRESS',
    INIT_COMPLETED = 'VAPI_TASK_INIT_COMPLETED',
    INIT_FAILED = 'VAPI_TASK_INIT_FAILED',

    // COMPILE STATE
    COMPILE_STARTED = 'VAPI_TASK_COMPILE_STARTED',
    COMPILE_IN_PROGRESS = 'VAPI_TASK_COMPILE_IN_PROGRESS',
    COMPILE_COMPLETED = 'VAPI_TASK_COMPILE_COMPLETED',
    COMPILE_FAILED = 'VAPI_TASK_COMPILE_FAILED',

    // EXECUTION STATE
    EXECUTION_STARTED = 'VAPI_TASK_EXECUTION_STARTED',
    EXECUTION_IN_PROGRESS = 'VAPI_TASK_EXECUTION_IN_PROGRESS',
    EXECUTION_WAITING = 'EXECUTION_WAITING',
    EXECUTION_FAILED = 'VAPI_TASK_EXECUTION_FAILED',

    // FINAL STATES
    FAILED = 'VAPI_TASK_FAILED',
    COMPLETED = 'VAPI_TASK_COMPLETED'
}

