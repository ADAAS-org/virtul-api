import { v4 as uuidv4 } from 'uuid';
import { IVAPISerializedTaskMemory } from './memory.types'

export class VAPITaskMemory {

    // memory identifier 
    id: string = uuidv4()


    protected memory: Map<string, any> = new Map()

    constructor(serialized?: IVAPISerializedTaskMemory) {
        if (serialized)
            this.fromJSON(serialized);
    }


    async add(key: string, value: any) {

        this.memory.set(key, value);
    }


    async get(key: string): Promise<any> {
        return this.memory.get(key);
    }


    async remove(key: string) {
        this.memory.delete(key);
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