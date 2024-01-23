import { VAPIExecutionTask } from "./task.abstract";
import { VAPIError } from "../error/error.abstract";
import { IVAPIExecutionTaskError, IVAPIExecutionTaskSerializedError } from "./task.types";
import { IVAPIErrorParams } from "../error/error.types";
export declare class VAPIExecutionTaskError extends VAPIError implements IVAPIExecutionTaskError {
    name: string;
    code: string;
    description: string;
    originalError: Error | unknown;
    task: VAPIExecutionTask<any>;
    constructor(task: VAPIExecutionTask<any>, params: IVAPIErrorParams, originalError?: Error | unknown);
    toJSON(): IVAPIExecutionTaskSerializedError;
}
