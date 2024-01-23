import { IVAPIError, IVAPIErrorParams, IVAPISerializedError } from "./error.types";
export declare class VAPIError extends Error implements IVAPIError {
    name: string;
    code: string;
    description: string;
    originalError: Error | unknown;
    constructor(params: IVAPIErrorParams, originalError?: Error | unknown);
    toJSON(): IVAPISerializedError;
}
