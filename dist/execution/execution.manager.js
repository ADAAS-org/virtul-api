"use strict";
//|=======================================================|//
//|====================ExecutionManager===================|//
//|========================v:0.0.1========================|//
//|=======================================================|//
//|=======================================================|//
//|_______________________________________________________|//
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIExecutionManager = void 0;
const connector_manager_1 = require("../connectors/connector.manager");
const logger_manager_1 = require("../logger/logger.manager");
const task_abstract_1 = require("../tasks/task.abstract");
const error_abstract_1 = require("../error/error.abstract");
const execution_constants_1 = require("./execution.constants");
// It should be a standalone addon that manages all executions
//It should init on the application start ???
class VAPIExecutionManager {
    connectorManager = new connector_manager_1.VAPIConnectorsManager();
    loggerManager = new logger_manager_1.LoggerManager();
    constructor() {
    }
    async init() {
        console.log('Manager Initialization...');
    }
    async execute(params, config) {
        try {
            // Get Target Connector
            const targetConnector = await this.connectorManager.getNewConnector({
                id: params.connector.id,
                version: params.connector.version,
                type: 'default'
            });
            const newTask = new task_abstract_1.VAPIExecutionTask(params, {});
            this.loggerManager.listen(newTask);
            await newTask.init();
            if (config.sync) {
                await newTask.compile();
            }
            else {
                newTask.compile();
            }
            return newTask;
            // this.queue.push(newTask.toJSON())
        }
        catch (error) {
            throw (error instanceof error_abstract_1.VAPIError ? error : new error_abstract_1.VAPIError({
                ...execution_constants_1.DEFAULT_EXECUTION_ERRORS.DEFAULT_EXECUTION_ERROR,
                message: error instanceof Error ? error.message : execution_constants_1.DEFAULT_EXECUTION_ERRORS.DEFAULT_EXECUTION_ERROR.message,
                originalError: error
            }));
        }
    }
    async syncExecution(task) {
        // create a record in DB and init
        await task.init();
        // Compile Prompt
        await task.compile();
        // Execute Task
        const response = await task.execute();
        await task.complete();
        return response;
    }
    async executionListener(channel, task) {
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
exports.VAPIExecutionManager = VAPIExecutionManager;
//# sourceMappingURL=execution.manager.js.map