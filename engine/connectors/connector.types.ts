import { Dictionary } from "../shared/types";
import { IVAPIError, IVAPISerializedError } from "../error/error.types";
import { VAPIExecutionTask } from "../tasks/task.abstract";
import { VAPIConnector } from "./connector.abstract";
import { VAPIExecutionTaskLifecycle } from "../tasks/task.types";
import { VAPITypesConverter } from './types-converter/types-converter.abstract'
import { VAPITaskMemory } from '../memory/memory.abstract'
import { AxiosResponse } from "axios";

export interface IVAPIConnectorEmitProps {
    severity?: 'error' | 'info' | 'warning',
    sync?: boolean,
    connector?: VAPIConnector,
    message?: string,
    error?: IVAPIError | Error,
    payload?: any
}

export interface IVAPIConnectorOnProps {
    severity?: 'error' | 'info' | 'warning',
    date: string,
    message: string,
    connector?: VAPIConnector,
    error?: IVAPIError | Error,
    payload?: any
}


export enum VAPIConnectorActions {
    // EXECUTION STATE
    EXECUTION_STARTED = 'VAPI_TASK_EXECUTION_STARTED',
    EXECUTION_IN_PROGRESS = 'VAPI_TASK_EXECUTION_IN_PROGRESS',
    EXECUTION_WAITING = 'EXECUTION_WAITING',
    EXECUTION_FAILED = 'VAPI_TASK_EXECUTION_FAILED',

    // FINAL STATES
    FAILED = 'VAPI_TASK_FAILED',
    COMPLETED = 'VAPI_TASK_COMPLETED'
}


export interface VAPIConnectorParamsMappingObject {
    source?: IVAPIConnectorVariable,
    target: IVAPIConnectorVariable
}


export interface IVAPIConnectorExecuteAddons {
    converter?: VAPITypesConverter,
    mapping?: VAPIConnectorParamsMappingObject[]
}



// ================ CONNECTOR ERRORS TYPES=====================
export interface IVAPIConnectorError extends IVAPIError {
    connector: VAPIConnector
}

export interface IVAPIConnectorSerializedError extends IVAPISerializedError {
    connector: IVAPISerializedConnector
}



// ================ DEFAULT CONNECTOR TYPES=====================
export interface IVAPIConnectorVariable {
    id: string,
    name: string,
    value: any,
    type: 'json' | 'array' | 'number' | 'string' | 'boolean' | 'base_64' | 'file' | 'file_url' | string,
    issuer: 'system' | 'custom' | 'proxy' | 'credentials' | string
}


export interface IVAPIMarkupVariable {
    id: string,
    key: string,
    type: 'json' | 'array' | 'number' | 'string' | 'boolean' | 'base_64' | 'file' | 'file_url' | string,
    issuer: 'system' | 'custom' | 'proxy' | 'credentials' | string,
    referenceId: string,
}



export interface IJSONMarkupParams {
    markup: string,
    parameters: Array<IVAPIConnectorVariable>
}


export interface IConnectorAPIConfig {
    url: string,
    method: 'post' | 'get' | 'put' | 'delete',
    body: any,
    params: any,
    headers: any,
    response: any
    parameters: Array<IVAPIConnectorVariable>
}

export interface IVAPIConnector {
    execute(request: VAPITaskMemory, extras: IVAPIConnectorExecuteAddons): Promise<Dictionary<any>>

    toJSON(): IVAPISerializedConnector
}



export interface IVAPISerializedConnector {
    id: string
    config: IConnectorAPIConfig
}


export interface IVAPIConnectorResultProcessingReturnValue {
    original: Dictionary<any>,
    result: Dictionary<any>
}


export interface IVAPIHTTPConnectorResultProcessingReturnValue extends IVAPIConnectorResultProcessingReturnValue {
    original: AxiosResponse

} 