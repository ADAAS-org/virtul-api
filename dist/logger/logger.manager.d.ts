import { VAPIExecutionTask } from "../tasks/task.abstract";
import { IVAPIExecutionTaskOnProps } from "../tasks/task.types";
import { VAPILogger } from "./logger.abstract";
export declare class LoggerManager {
    protected loggers: Map<string, VAPILogger>;
    addLogger(logger: VAPILogger): void;
    getLogger(name: any): VAPILogger | undefined;
    listen(task: VAPIExecutionTask<any>): void;
    protected log(data: IVAPIExecutionTaskOnProps<any>): Promise<void>;
}
