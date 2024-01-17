import { VAPIError } from "../error/error.abstract";
import { VAPIConnector } from "./connector.abstract";
import { DEFAULT_CONNECTOR_ERRORS } from "./connector.contsants";

export class VAPIConnectorsManager<T> {


    private connectors: Map<string, VAPIConnector> = new Map();


    async getConnector(params: T): Promise<VAPIConnector> {
        let target = this.connectors.get(JSON.stringify(params));

        if (!target) {
            // try to import connector

            const newConnector = await this.import(params);

            this.connectors.set(JSON.stringify(params), newConnector)


            target = newConnector;

        }
        // throw new CustomError(DEFAULT_CONNECTOR_MANAGER_ERRORS.TARGET_CONNECTOR_NOT_FOUND)

        return target;
    }

    async getNewConnector(params: T): Promise<VAPIConnector> {
        return this.import(params);
    }

    protected async import(params: T): Promise<VAPIConnector> {
        params;
        throw new Error('Method Not Implemented')

    }

    protected async download() {
        throw new VAPIError(DEFAULT_CONNECTOR_ERRORS.METHOD_NOT_IMPLEMENTED)
    }

}