import moment, { Moment } from "moment";
import { IVAPISerializedExecutionTask, IVAPIExecutionTaskConstructorConfig, IVAPIExecutionTaskEmitProps, VAPIExecutionTaskLifecycle, IVAPIExecutionTaskOnProps } from "./task.types";
import { DEFAULT_EXECUTION_TASK_CONSTRUCTOR_CONFIG, DEFAULT_EXECUTION_TASK_ERRORS } from "./task.constants";
import { EventEmitter } from "events";
import { VAPIExecutionError } from "../execution/execution.error";
import { DEFAULT_EXECUTION_ERRORS } from "../execution/execution.constants";
import { VAPIExecutionTaskError } from "./task.errors";
import { v4 as uuidv4 } from 'uuid';
import { VAPITaskMemory } from "../memory/memory.abstract";
import { VAPITypesConverter } from "../connectors/types-converter/types-converter.abstract";
import { StringConverter, NumberConverter, BooleanConverter, ArrayConverter, JSONConverter } from "../connectors/types-converter/converters.default";


export class VAPIExecutionTask<T extends string> extends EventEmitter {
    start!: Moment
    end?: Moment


    id: string = uuidv4();
    status: any = 'PENDING'

    params!: any;
    config!: IVAPIExecutionTaskConstructorConfig;


    memory: VAPITaskMemory = new VAPITaskMemory();

    converter: VAPITypesConverter = new VAPITypesConverter()
        .set(StringConverter.type, StringConverter.converter)
        .set(NumberConverter.type, NumberConverter.converter)
        .set(BooleanConverter.type, BooleanConverter.converter)
        .set(ArrayConverter.type, ArrayConverter.converter)
        .set(JSONConverter.type, JSONConverter.converter)


    protected readyPromise?: Promise<boolean>

    constructor(
        params: any | IVAPISerializedExecutionTask,
        config?: IVAPIExecutionTaskConstructorConfig,
    )
    constructor(
        params?: any | IVAPISerializedExecutionTask,
        config?: IVAPIExecutionTaskConstructorConfig,
    ) {
        super();
        if (params && (params as IVAPISerializedExecutionTask).state === 'serialized')
            this.fromJSON(params as IVAPISerializedExecutionTask)
        else if (params && config) {
            this.onCreateNew(params, config);
        } else {
            throw new VAPIExecutionTaskError(this, DEFAULT_EXECUTION_TASK_ERRORS.INVALID_CONSTRUCTOR_PARAMETERS)
        }
    }


    protected onCreateNew(
        params: any,
        config: IVAPIExecutionTaskConstructorConfig,
    ) {
        this.start = moment();

        this.params = params;
        this.config = config || DEFAULT_EXECUTION_TASK_CONSTRUCTOR_CONFIG;
    }


    emit(eventName: '*' | T, actionProps: IVAPIExecutionTaskEmitProps = {}): boolean {
        const outProps: IVAPIExecutionTaskOnProps<T> = {
            ...actionProps,
            message: actionProps.message ? actionProps.message : eventName as string,
            date: moment().toISOString(),
            sync: actionProps.sync ? true : false,
            severity: actionProps.severity ? actionProps.severity : 'info',
            task: this
        }

        // To any listener if provided
        if (this.eventNames().includes('*'))
            super.emit('*', outProps);

        // otherwise 
        return super.emit(eventName as string, outProps)
    }

    on(eventName: '*' | T, listener: (args: IVAPIExecutionTaskOnProps<T>) => void): this {

        super.on(eventName as string, listener);
        return this;
    }

    ready(): Promise<boolean> {
        if (!this.readyPromise)
            this.readyPromise = new Promise((resolve, reject) => this.load()
                .then(() => resolve(true))
                .catch(reject))

        return this.readyPromise;
    }


    protected async load(): Promise<void> {
        throw new VAPIExecutionTaskError(this, DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED)
    }


    // should create a new Task in DB  with basic records
    async init(...props: any): Promise<void> {
        throw new VAPIExecutionTaskError(this, DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED)
    }


    // Should compile everything before execution
    async compile(...props: any) {
        throw new VAPIExecutionTaskError(this, DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED)
    }


    // Should execute a task using attached connector
    async execute(...props: any) {
        throw new VAPIExecutionTaskError(this, DEFAULT_EXECUTION_ERRORS.METHOD_NOT_IMPLEMENTED)
    }


    // ================================STATE CHANGING ACTIONS================================================

    //uses to mark task as completed and destroys it
    async complete(result?: any): Promise<void> {
        this.end = moment();
        this.status = 'COMPLETED';

        this.emit(VAPIExecutionTaskLifecycle.COMPLETED as T, {
            payload: result
        });

        this.destroy();
    }

    //  uses to mark task as FAILED and destroys it 
    async failed(error: Error
        | VAPIExecutionError
    ): Promise<never> {
        this.end = moment();
        this.status = 'FAILED';

        this.emit(VAPIExecutionTaskLifecycle.FAILED as T, {
            error
        });

        this.destroy();

        throw error;
    }


    // Should destroy the task after execution.
    async destroy() {
        this.removeAllListeners();
    }


    // ================================CONVERSION ACTIONS================================================

    // Will serialize current object to provide an ability to restore it
    toJSON(): IVAPISerializedExecutionTask {
        return {
            id: this.id,
            start: this.start.toISOString(),
            end: this.end ? this.end.toISOString() : undefined,
            status: this.status,
            params: this.params,
            config: this.config,
            state: 'serialized'
        }
    }


    // Will set all required properties based on the input
    protected fromJSON(serialized: IVAPISerializedExecutionTask) {
        this.id = serialized.id
        this.status = serialized.status
        this.start = moment(serialized.start);
        this.end = serialized.end ? moment(serialized.end) : undefined

        this.config = serialized.config
        this.params = serialized.params
    }
}