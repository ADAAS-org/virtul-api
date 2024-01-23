import { IVAPILoggerError, IVAPILoggerErrorParams } from "./logger.types";
export declare class VAPILoggerError extends Error implements IVAPILoggerError {
    date: string;
    name: string;
    code: string;
    description: string;
    originalError: Error | unknown;
    constructor(params: IVAPILoggerErrorParams, originalError?: Error | unknown);
    get compilingData(): IVAPILoggerErrorParams;
}
