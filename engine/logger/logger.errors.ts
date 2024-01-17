import moment from "moment";
import { IVAPILoggerError, IVAPILoggerErrorParams } from "./logger.types";

export class VAPILoggerError extends Error implements IVAPILoggerError {

    date: string;
    name: string;
    code: string;
    description: string;
    originalError: Error | unknown


    constructor(params: IVAPILoggerErrorParams, originalError?: Error | unknown) {
        super(params.message);

        this.name = params.name;
        this.code = params.code;
        this.description = params.description;
        this.originalError = originalError
        this.date = moment().toISOString()
    }

    get compilingData(): IVAPILoggerErrorParams {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            date: this.date
        }
    }
}


