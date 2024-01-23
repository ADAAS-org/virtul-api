/// <reference types="node" />
import { Moment } from "moment";
import { IVAPISerializedExecutionTask, IVAPIExecutionTaskConstructorConfig, IVAPIExecutionTaskEmitProps, IVAPIExecutionTaskOnProps } from "./task.types";
import { EventEmitter } from "events";
import { VAPIExecutionError } from "../execution/execution.error";
import { VAPITaskMemory } from "../memory/memory.abstract";
import { VAPITypesConverter } from "../connectors/types-converter/types-converter.abstract";
export declare class VAPIExecutionTask<T extends string> extends EventEmitter {
    start: Moment;
    end?: Moment;
    id: string;
    status: any;
    params: any;
    config: IVAPIExecutionTaskConstructorConfig;
    memory: VAPITaskMemory;
    converter: VAPITypesConverter;
    protected readyPromise?: Promise<boolean>;
    constructor(params: any | IVAPISerializedExecutionTask, config?: IVAPIExecutionTaskConstructorConfig);
    protected onCreateNew(params: any, config: IVAPIExecutionTaskConstructorConfig): void;
    emit(eventName: '*' | T, actionProps?: IVAPIExecutionTaskEmitProps): boolean;
    on(eventName: '*' | T, listener: (args: IVAPIExecutionTaskOnProps<T>) => void): this;
    ready(): Promise<boolean>;
    protected load(): Promise<void>;
    init(...props: any): Promise<void>;
    compile(...props: any): Promise<void>;
    execute(...props: any): Promise<void>;
    complete(result?: any): Promise<void>;
    failed(error: Error | VAPIExecutionError): Promise<never>;
    destroy(): Promise<void>;
    toJSON(): IVAPISerializedExecutionTask;
    protected fromJSON(serialized: IVAPISerializedExecutionTask): void;
}
