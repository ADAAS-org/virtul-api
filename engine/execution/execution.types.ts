import { VAPIExecutionTask } from "../tasks/task.abstract";
import { VAPIExecutionTaskLifecycle } from "../tasks/task.types";



// ================ EXECUTION ERRORS TYPES=====================
export type IVAPIExecutionErrorParams = {
    name: string;
    code: string;
    description: string
    message: string,

    originalError?: Error | unknown
}


export interface IVAPIExecutionError {
    task: VAPIExecutionTask<VAPIExecutionTaskLifecycle>
    name: string;
    code: string;
    description: string;

    originalError?: Error | unknown
}


export interface IExecutionTestConfig {
    sync?: boolean
}