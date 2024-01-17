import { Dictionary } from "../shared/types";
import { AxiosError } from "axios";
import { VAPIConnectorError } from "../connectors/connector.errors";



// ================ LOGGER ERRORS TYPES=====================
export type IVAPILoggerErrorParams = {
    date: string,
    name: string;
    code: string;
    description: string
    message: string,

    originalError?: Error | unknown
}

export interface IVAPILoggerError {
    name: string;
    code: string;
    description: string;

    originalError?: Error | unknown
}


// ================ DEFAULT LOGGER TYPES=====================
export interface IVAPILogger {
    name: string;

    asyncLog(severity: 'error' | 'info' | 'warning', error: any)

    syncLog(severity: 'error' | 'info' | 'warning', data: Error  | AxiosError | VAPIConnectorError | any): Promise<void>

}


export interface IVAPILoggerRecord {
    id?: number,
    date: string,
    severity: 'info' | 'warning' | 'error',
    error?: Error | any | AxiosError | VAPIConnectorError
    log?: string | any,

    promptId?: number,
    promptVersion?: number,
    connectorId?: number,
    connectorVersion?: number,
    apiCredentialsId?: number,
    userId?: number
}
