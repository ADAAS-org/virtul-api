//|=======================================================|//
//|====================ExecutionManager===================|//
//|========================v:0.0.1========================|//
//|=======================================================|//
//|=======================================================|//
//|_______________________________________________________|//

import { VAPIConnectorsManager } from "../connectors/connector.manager";
import { IExecutionTestConfig } from "./execution.types";
import { LoggerManager } from "../logger/logger.manager";
import { VAPIExecutionTask } from "../tasks/task.abstract";
import { IVAPISerializedExecutionTask } from "../tasks/task.types";
import { VAPIError } from "../error/error.abstract";
import { DEFAULT_EXECUTION_ERRORS } from "./execution.constants";



// It should be a standalone addon that manages all executions
//It should init on the application start ???
export class VAPIExecutionManager {


    protected connectorManager: VAPIConnectorsManager<any> = new VAPIConnectorsManager()
    protected loggerManager: LoggerManager = new LoggerManager()

    constructor() {


    }


    async init() {
        console.log('Manager Initialization...')
    }


    async execute(params: any, config: IExecutionTestConfig): Promise<VAPIExecutionTask<any>> {
        try {

            // Get Target Connector
            const targetConnector = await this.connectorManager.getNewConnector({
                id: params.connector.id,
                version: params.connector.version,
                type: 'default'
            });

            const newTask = new VAPIExecutionTask(
                params, {
            });

            this.loggerManager.listen(newTask);

            await newTask.init();

            if (config.sync) {
                await newTask.compile();
            } else {
                newTask.compile();

            }


            return newTask;

            // this.queue.push(newTask.toJSON())
        } catch (error) {
            throw (error instanceof VAPIError ? error : new VAPIError({
                ...DEFAULT_EXECUTION_ERRORS.DEFAULT_EXECUTION_ERROR,
                message: error instanceof Error ? error.message : DEFAULT_EXECUTION_ERRORS.DEFAULT_EXECUTION_ERROR.message,
                originalError: error
            }))
        }
    }



    protected async syncExecution(task: VAPIExecutionTask<any>): Promise<any> {
        // create a record in DB and init
        await task.init();
        // Compile Prompt
        await task.compile();



        // Execute Task
        const response = await task.execute();

        await task.complete();

        return response;
    }



    async executionListener(channel, task: IVAPISerializedExecutionTask) {
        // const receivedTask = new VAPIExecutionTask(task);

        // try {
        //     if (task.connectorVersion) {
        //         const targetConnector = await this.connectorManager.getConnector(task.connectorVersion);

        //         await targetConnector.execute(receivedTask);
        //     }

        // } catch (error) {
        //     receivedTask.failed();

        // }

        // await channel.ack();
    }





}