import { VAPIExecutionTask } from "./task.abstract";
import { VAPIError } from "../error/error.abstract";
import { IVAPIExecutionTaskError, IVAPIExecutionTaskSerializedError } from "./task.types";
import { IVAPIErrorParams } from "../error/error.types";

export class VAPIExecutionTaskError extends VAPIError implements IVAPIExecutionTaskError {
    name: string;
    code: string;
    description: string;
    originalError: Error | unknown
    task: VAPIExecutionTask<any>


    constructor(task: VAPIExecutionTask<any>, params: IVAPIErrorParams, originalError?: Error | unknown) {
        super(params);

        this.task = task;
        this.name = params.name;
        this.code = params.code;
        this.description = params.description;
        this.originalError = originalError;
    }



    toJSON(): IVAPIExecutionTaskSerializedError {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            task: this.task.toJSON()
        }
    }
}