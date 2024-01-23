import { AxiosError } from "axios";
import { VAPIError } from "../error/error.abstract";
import { IVAPIErrorParams } from "../error/error.types";
import { VAPIConnector } from "./connector.abstract";
import { IVAPIConnectorError, IVAPIConnectorSerializedError } from "./connector.types";
export declare class VAPIConnectorError extends VAPIError implements IVAPIConnectorError {
    name: string;
    code: string;
    description: string;
    originalError: Error | unknown;
    connector: VAPIConnector;
    constructor(connector: VAPIConnector, params: IVAPIErrorParams, originalError?: Error | AxiosError | unknown);
    toJSON(): IVAPIConnectorSerializedError;
}
