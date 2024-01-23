import { VAPIConnector } from "./connector.abstract";
export declare class VAPIConnectorsManager<T> {
    private connectors;
    getConnector(params: T): Promise<VAPIConnector>;
    getNewConnector(params: T): Promise<VAPIConnector>;
    protected import(params: T): Promise<VAPIConnector>;
    protected download(): Promise<void>;
}
