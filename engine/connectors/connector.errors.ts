import { AxiosError } from "axios";
import { VAPIError } from "../error/error.abstract";
import { IVAPIErrorParams } from "../error/error.types";
import { VAPIConnector } from "./connector.abstract";
import {
    IVAPIConnectorError,
    IVAPIConnectorSerializedError
} from "./connector.types";
import _ from "lodash";

export class VAPIConnectorError extends VAPIError implements IVAPIConnectorError {

    name: string;
    code: string;
    description: string;
    originalError: Error | unknown
    connector: VAPIConnector


    constructor(connector: VAPIConnector, params: IVAPIErrorParams, originalError?: Error | AxiosError | unknown) {
        super(params);

        this.connector = connector;
        this.name = params.name;
        this.code = params.code;
        this.description = params.description;

        if (originalError && originalError instanceof AxiosError) {
            this.name = _.get(originalError, 'response.data.name')
                ? _.get(originalError, 'response.data.name')
                : _.get(originalError, 'response.data.error.message')
                    ? _.get(originalError, 'response.data.error.message')
                    : _.get(originalError, 'name')
                        ? _.get(originalError, 'name')
                        : _.get(originalError, 'message')
                            ? _.get(originalError, 'message')
                            : this.name

            this.code = _.get(originalError, 'response.data.code')
                ? _.get(originalError, 'response.data.code')
                : _.get(originalError, 'code')
                    ? _.get(originalError, 'code')
                    : _.get(originalError, 'type')
                        ? _.get(originalError, 'type')
                        : this.code

            this.description =
                _.get(originalError, 'response.data.description')
                    ? _.get(originalError, 'response.data.description')
                    : this.description

        }

        this.originalError = originalError
    }
    toJSON(): IVAPIConnectorSerializedError {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,

            connector: this.connector.toJSON(),
            originalError: {
                name: this.originalError instanceof Error ? {
                    name: this.originalError.name,
                    message: this.originalError.message
                } : this.originalError instanceof AxiosError ? {
                    code: this.originalError.code,
                    name: this.originalError.name,
                    status: this.originalError.status,
                    response: this.originalError.response?.data
                } : this.originalError
            }
        }
    }
}


