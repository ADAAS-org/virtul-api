import {
    IConnectorAPIConfig,
    IVAPIConnector,
    IVAPIConnectorEmitProps,
    IVAPIConnectorExecuteAddons,
    IVAPIConnectorOnProps,
    IVAPIConnectorResultProcessingReturnValue,
    IVAPIConnectorVariable,
    IVAPISerializedConnector,
    VAPIConnectorActions
} from "./connector.types";
import { DEFAULT_CONNECTOR_ERRORS } from "./connector.contsants";
import { VAPIExecutionTask } from "../tasks/task.abstract";
import { VAPIConnectorError } from "./connector.errors";
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from "stream";
import moment from "moment";
import { VAPITaskMemory } from "../memory/memory.abstract";


export class VAPIConnector extends EventEmitter implements IVAPIConnector {

    id!: string

    variables: Map<string, IVAPIConnectorVariable> = new Map()

    protected config!: IConnectorAPIConfig

    constructor(config: IConnectorAPIConfig) {
        super();

        this.id = uuidv4();

        this.config = config;

        // [
        //     ...this.config.credentials.map(el => ({
        //         ...el,
        //         issuer: 'credentials'
        //     }) as IVAPIConnectorVariable),
        //     ...this.config.proxy.map(el => ({
        //         ...el,
        //         issuer: 'proxy'
        //     }) as IVAPIConnectorVariable)
        // ]
        //     .forEach(el => this.variables.set(el.id, el))
    }


    emit(eventName: '*' | VAPIConnectorActions, actionProps: IVAPIConnectorEmitProps = {}): boolean {
        const outProps: IVAPIConnectorOnProps = {
            ...actionProps,
            message: actionProps.message ? actionProps.message : eventName as string,
            date: moment().toISOString(),
            severity: actionProps.severity ? actionProps.severity : 'info',
            connector: this
        }

        // To any listener if provided
        if (this.eventNames().includes('*'))
            super.emit('*', outProps);

        // otherwise 
        return super.emit(eventName as string, outProps)
    }

    on(eventName: '*' | VAPIConnectorActions, listener: (args: IVAPIConnectorOnProps) => void): this {
        super.on(eventName as string, listener);
        return this;
    }

    // there connector should use prompt to call API
    async execute(request: VAPITaskMemory, extras: IVAPIConnectorExecuteAddons): Promise<IVAPIConnectorResultProcessingReturnValue> {
        throw new VAPIConnectorError(this, DEFAULT_CONNECTOR_ERRORS.METHOD_NOT_IMPLEMENTED)
    }



    toJSON(): IVAPISerializedConnector {
        return {
            id: this.id,
            config: this.config
        }
    }
}