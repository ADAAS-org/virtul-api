import { VAPIExecutionTask } from "../tasks/task.abstract";
import { IVAPIExecutionTaskOnProps } from "../tasks/task.types";
import { VAPILogger } from "./logger.abstract";



export class LoggerManager {

    protected loggers: Map<string, VAPILogger> = new Map();

    addLogger(logger: VAPILogger) {
        this.loggers.set(logger.name, logger);
    }

    getLogger(name) {
        return this.loggers.get(name);
    }




    listen(task: VAPIExecutionTask<any>) {
        task.on('*', (data) => this.log(data));
    }

    protected async log(data: IVAPIExecutionTaskOnProps<any>) {

        for (const [id, logger] of this.loggers.entries()) {
            const severity = data.severity ? data.severity : 'info';
            if (data.sync)
                await logger.syncLog(severity, data);
            else
                logger.asyncLog(severity, data);
        }
    }
}