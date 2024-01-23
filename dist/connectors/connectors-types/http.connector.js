"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIHTTPConnector = void 0;
const connector_types_1 = require("../connector.types");
const converters_default_1 = require("../types-converter/converters.default");
const connector_abstract_1 = require("../connector.abstract");
const connector_errors_1 = require("../connector.errors");
const connector_contsants_1 = require("../connector.contsants");
const params_parser_1 = require("../../parsers/params.parser");
const Params_herlper_1 = require("../helpers/Params.herlper");
const axios_1 = __importStar(require("axios"));
const types_converter_abstract_1 = require("../types-converter/types-converter.abstract");
const lodash_1 = __importDefault(require("lodash"));
class VAPIHTTPConnector extends connector_abstract_1.VAPIConnector {
    bodyMethods = ['post', 'put'];
    nonBodyMethods = ['get', 'delete'];
    constructor(config) {
        super(config);
        config
            .parameters
            .forEach(el => this.variables.set(el.id, el));
    }
    // there connector should use prompt to call API
    async execute(request, extras) {
        try {
            const response = await this.apiCall(request, extras);
            const converter = extras.converter ? extras.converter : new types_converter_abstract_1.VAPITypesConverter()
                .set(converters_default_1.StringConverter.type, converters_default_1.StringConverter.converter)
                .set(converters_default_1.NumberConverter.type, converters_default_1.NumberConverter.converter)
                .set(converters_default_1.BooleanConverter.type, converters_default_1.BooleanConverter.converter)
                .set(converters_default_1.ArrayConverter.type, converters_default_1.ArrayConverter.converter)
                .set(converters_default_1.JSONConverter.type, converters_default_1.JSONConverter.converter);
            return await this.responseProcessing(response, converter);
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                console.log('error data: ', error.response?.data);
                throw new connector_errors_1.VAPIConnectorError(this, connector_contsants_1.DEFAULT_CONNECTOR_ERRORS.REMOTE_API_ERROR, error);
            }
            else
                throw error;
        }
    }
    async apiCall(request, extras) {
        const headers = await Params_herlper_1.VAPIConnectorsParamsHelper.fillInByMarkup(this.config.headers, this.variables, request, extras.mapping);
        const params = await Params_herlper_1.VAPIConnectorsParamsHelper.fillInByMarkup(this.config.params, this.variables, request, extras.mapping);
        const body = this.config.body ? await Params_herlper_1.VAPIConnectorsParamsHelper.fillInByMarkup(this.config.body, this.variables, request, extras.mapping) : undefined;
        this.emit(connector_types_1.VAPIConnectorActions.EXECUTION_IN_PROGRESS, {
            message: `Trying to execute... ${this.config.method} :: ${this.config.url}`,
            payload: {
                headers,
                params,
                body
            }
        });
        if (this.bodyMethods.includes(this.config.method)) {
            return await axios_1.default[this.config.method](this.config.url, body, {
                headers,
                params
            });
        }
        else {
            return await axios_1.default[this.config.method](this.config.url, {
                headers,
                params
            });
        }
    }
    async responseProcessing(originalResponse, converter) {
        let out = {
            original: originalResponse,
            result: {}
        };
        const parser = new params_parser_1.ParamsParser();
        const { parsed, replacement } = parser.getJSON(this.config.response);
        for (const variable of parser.extract(this.config.response)) {
            const target = replacement.find(rep => rep.span.id === variable.id);
            if (target) {
                const responsePath = parser.getPropertyPath(parsed, target.key);
                if (responsePath) {
                    let targetValue = lodash_1.default.get(originalResponse.data, responsePath);
                    targetValue = await converter.convert(variable.type, targetValue);
                    lodash_1.default.set(out.result, variable.id, targetValue);
                }
            }
        }
        return out;
    }
}
exports.VAPIHTTPConnector = VAPIHTTPConnector;
//# sourceMappingURL=http.connector.js.map