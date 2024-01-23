import { IVAPISerializedTaskMemory } from './memory.types';
import { IVAPIConnectorVariable, IVAPIMarkupVariable } from '../connectors/connector.types';
export declare class VAPITaskMemory {
    id: string;
    protected memory: Map<string, any>;
    constructor(serialized?: IVAPISerializedTaskMemory);
    add(param: IVAPIConnectorVariable | IVAPIMarkupVariable, value: any): Promise<void>;
    get(param: IVAPIConnectorVariable | IVAPIMarkupVariable): Promise<any>;
    remove(param: IVAPIConnectorVariable | IVAPIMarkupVariable): Promise<void>;
    destroy(): Promise<void>;
    toJSON(): IVAPISerializedTaskMemory;
    fromJSON(serialized: IVAPISerializedTaskMemory): void;
}
