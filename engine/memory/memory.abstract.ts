import { v4 as uuidv4 } from 'uuid';
import { IVAPISerializedTaskMemory } from './memory.types'
import { IVAPIConnectorVariable, IVAPIMarkupVariable } from 'engine/connectors/connector.types';

export class VAPITaskMemory {

    // memory identifier 
    id: string = uuidv4()


    protected memory: Map<string, any> = new Map()

    constructor(serialized?: IVAPISerializedTaskMemory) {
        if (serialized)
            this.fromJSON(serialized);
    }


    async add(param: IVAPIConnectorVariable | IVAPIMarkupVariable, value: any) {
        this.memory.set(param.id, value);
    }


    async get(param: IVAPIConnectorVariable | IVAPIMarkupVariable): Promise<any> {
        return this.memory.get(param.id);
    }


    async remove(param: IVAPIConnectorVariable | IVAPIMarkupVariable) {
        this.memory.delete(param.id);
    }


    async destroy() {
        this.memory.clear();
    }


    toJSON(): IVAPISerializedTaskMemory {
        return {
            id: this.id,
            memory: JSON.stringify(Array.from(this.memory.entries()))
        }
    }

    fromJSON(serialized: IVAPISerializedTaskMemory) {


    }
}