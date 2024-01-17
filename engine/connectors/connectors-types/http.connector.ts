import {
    IConnectorAPIConfig,
    IVAPIConnectorExecuteAddons,
    IVAPIConnectorResultProcessingReturnValue,
    VAPIConnectorActions
} from "../connector.types";
import {
    StringConverter,
    NumberConverter,
    BooleanConverter,
    ArrayConverter,
    JSONConverter
} from "../types-converter/converters.default";
import { VAPIConnector } from "../connector.abstract";
import { VAPIConnectorError } from "../connector.errors";
import { DEFAULT_CONNECTOR_ERRORS } from "../connector.contsants";
import { ParamsParser } from "../../parsers/params.parser";
import { VAPIConnectorsParamsHelper } from "../helpers/Params.herlper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { VAPITypesConverter } from "../types-converter/types-converter.abstract";
import { VAPITaskMemory } from "../../memory/memory.abstract";
import _ from 'lodash';

export class VAPIHTTPConnector extends VAPIConnector {

    protected bodyMethods = ['post', 'put'];
    protected nonBodyMethods = ['get', 'delete'];


    constructor(config: IConnectorAPIConfig) {
        super(config);

        config
            .parameters
            .forEach(el => this.variables.set(el.id, el))
    }


    // there connector should use prompt to call API
    async execute(request: VAPITaskMemory, extras: IVAPIConnectorExecuteAddons): Promise<IVAPIConnectorResultProcessingReturnValue> {
        try {
            const response = await this.apiCall(request, extras);
            const converter = extras.converter ? extras.converter : new VAPITypesConverter()
                .set(StringConverter.type, StringConverter.converter)
                .set(NumberConverter.type, NumberConverter.converter)
                .set(BooleanConverter.type, BooleanConverter.converter)
                .set(ArrayConverter.type, ArrayConverter.converter)
                .set(JSONConverter.type, JSONConverter.converter)

            return await this.responseProcessing(response, converter);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log('error data: ', error.response?.data)
                throw new VAPIConnectorError(this, DEFAULT_CONNECTOR_ERRORS.REMOTE_API_ERROR, error)
            }
            else
                throw error;
        }
    }


    private async apiCall(request: VAPITaskMemory, extras: IVAPIConnectorExecuteAddons): Promise<AxiosResponse<any, any>> {
        const headers = await VAPIConnectorsParamsHelper.fillInByMarkup(this.config.headers, this.variables, request, extras.mapping);
        const params = await VAPIConnectorsParamsHelper.fillInByMarkup(this.config.params, this.variables, request, extras.mapping);
        const body = this.config.body ? await VAPIConnectorsParamsHelper.fillInByMarkup(this.config.body, this.variables, request, extras.mapping) : undefined;

        this.emit(VAPIConnectorActions.EXECUTION_IN_PROGRESS, {
            message: `Trying to execute... ${this.config.method} :: ${this.config.url}`,
            payload: {
                headers,
                params,
                body
            }
        });

        if (this.bodyMethods.includes(this.config.method)) {
            return await axios[this.config.method](
                this.config.url,
                body,
                {
                    headers,
                    params
                })

        } else {
            return await axios[this.config.method](
                this.config.url,
                {
                    headers,
                    params
                });
        }
    }


    private async responseProcessing(
        originalResponse: AxiosResponse,
        converter: VAPITypesConverter
    ): Promise<IVAPIConnectorResultProcessingReturnValue> {
        let out: IVAPIConnectorResultProcessingReturnValue = {
            original: originalResponse,
            result: {}
        };

        const parser = new ParamsParser()

        const { parsed, replacement } = parser.getJSON(this.config.response)

        for (const variable of parser.extract(this.config.response)) {

            const target = replacement.find(rep => rep.span.id === variable.id)


            if (target) {
                const responsePath = parser.getPropertyPath(parsed, target.key);

                if (responsePath) {
                    let targetValue = _.get(originalResponse.data, responsePath);

                    targetValue = await converter.convert(variable.type, targetValue);

                    _.set(out.result, variable.id, targetValue);
                }
            }
        }

        return out;
    }
}