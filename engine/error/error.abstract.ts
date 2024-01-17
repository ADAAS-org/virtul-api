import { IVAPIError, IVAPIErrorParams, IVAPISerializedError } from "./error.types";

export class VAPIError extends Error implements IVAPIError {

    name: string;
    code: string;
    description: string;
    originalError: Error | unknown


    constructor(params: IVAPIErrorParams, originalError?: Error | unknown) {
        super(params.message);

        this.name = params.name;
        this.code = params.code;
        this.description = params.description;
        this.originalError = originalError
    }
    toJSON(): IVAPISerializedError {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            originalError: this.originalError
        }
    }
}