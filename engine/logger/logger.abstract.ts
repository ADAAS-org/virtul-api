import { IVAPILogger } from "./logger.types";
import { VAPILoggerError } from './logger.errors'
import { DEFAULT_LOGGER_MANAGER_ERRORS } from "./logger.constants";


export class VAPILogger implements IVAPILogger {

    name!: string

    constructor(name: string) {
        this.name = name;
    }


    asyncLog(severity: "error" | "info" | "warning", error: any) {
        throw new VAPILoggerError(DEFAULT_LOGGER_MANAGER_ERRORS.METHOD_NOT_IMPLEMENTED)
    }

    syncLog(severity: "error" | "info" | "warning", data: any): Promise<void> {
        throw new VAPILoggerError(DEFAULT_LOGGER_MANAGER_ERRORS.METHOD_NOT_IMPLEMENTED)
    }
}