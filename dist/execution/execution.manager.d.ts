import { VAPIConnectorsManager } from "../connectors/connector.manager";
import { IExecutionTestConfig } from "./execution.types";
import { LoggerManager } from "../logger/logger.manager";
import { VAPIExecutionTask } from "../tasks/task.abstract";
import { IVAPISerializedExecutionTask } from "../tasks/task.types";
export declare class VAPIExecutionManager {
    protected connectorManager: VAPIConnectorsManager<any>;
    protected loggerManager: LoggerManager;
    constructor();
    init(): Promise<void>;
    execute(params: any, config: IExecutionTestConfig): Promise<VAPIExecutionTask<any>>;
    protected syncExecution(task: VAPIExecutionTask<any>): Promise<any>;
    executionListener(channel: any, task: IVAPISerializedExecutionTask): Promise<void>;
}
