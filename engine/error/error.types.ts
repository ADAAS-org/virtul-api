export type IVAPIErrorParams = {
    name: string;
    code: string;
    description: string
    message: string,

    originalError?: Error | unknown
}

export interface IVAPIError {
    name: string;
    code: string;
    message: string,
    description: string;

    originalError?: Error | unknown

    toJSON(): IVAPISerializedError
}


export interface IVAPISerializedError {
    name: string;
    code: string;
    message: string,
    description: string;

    originalError?: Error | unknown
}