/// <reference types="node" />
import { IConnectorAPIConfig, IVAPIConnector, IVAPIConnectorEmitProps, IVAPIConnectorExecuteAddons, IVAPIConnectorOnProps, IVAPIConnectorResultProcessingReturnValue, IVAPIConnectorVariable, IVAPISerializedConnector, VAPIConnectorActions } from "./connector.types";
import { EventEmitter } from "stream";
import { VAPITaskMemory } from "../memory/memory.abstract";
export declare class VAPIConnector extends EventEmitter implements IVAPIConnector {
    id: string;
    variables: Map<string, IVAPIConnectorVariable>;
    protected config: IConnectorAPIConfig;
    constructor(config: IConnectorAPIConfig);
    emit(eventName: '*' | VAPIConnectorActions, actionProps?: IVAPIConnectorEmitProps): boolean;
    on(eventName: '*' | VAPIConnectorActions, listener: (args: IVAPIConnectorOnProps) => void): this;
    execute(request: VAPITaskMemory, extras: IVAPIConnectorExecuteAddons): Promise<IVAPIConnectorResultProcessingReturnValue>;
    toJSON(): IVAPISerializedConnector;
}
