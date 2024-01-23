import { IConnectorAPIConfig, IVAPIConnectorExecuteAddons, IVAPIConnectorResultProcessingReturnValue } from "../connector.types";
import { VAPIConnector } from "../connector.abstract";
import { VAPITaskMemory } from "../../memory/memory.abstract";
export declare class VAPIHTTPConnector extends VAPIConnector {
    protected bodyMethods: string[];
    protected nonBodyMethods: string[];
    constructor(config: IConnectorAPIConfig);
    execute(request: VAPITaskMemory, extras: IVAPIConnectorExecuteAddons): Promise<IVAPIConnectorResultProcessingReturnValue>;
    private apiCall;
    private responseProcessing;
}
