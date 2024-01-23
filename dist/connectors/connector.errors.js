"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIConnectorError = void 0;
const axios_1 = require("axios");
const error_abstract_1 = require("../error/error.abstract");
const lodash_1 = __importDefault(require("lodash"));
class VAPIConnectorError extends error_abstract_1.VAPIError {
    name;
    code;
    description;
    originalError;
    connector;
    constructor(connector, params, originalError) {
        super(params);
        this.connector = connector;
        this.name = params.name;
        this.code = params.code;
        this.description = params.description;
        if (originalError && originalError instanceof axios_1.AxiosError) {
            this.name = lodash_1.default.get(originalError, 'response.data.name')
                ? lodash_1.default.get(originalError, 'response.data.name')
                : lodash_1.default.get(originalError, 'response.data.error.message')
                    ? lodash_1.default.get(originalError, 'response.data.error.message')
                    : lodash_1.default.get(originalError, 'name')
                        ? lodash_1.default.get(originalError, 'name')
                        : lodash_1.default.get(originalError, 'message')
                            ? lodash_1.default.get(originalError, 'message')
                            : this.name;
            this.code = lodash_1.default.get(originalError, 'response.data.code')
                ? lodash_1.default.get(originalError, 'response.data.code')
                : lodash_1.default.get(originalError, 'code')
                    ? lodash_1.default.get(originalError, 'code')
                    : lodash_1.default.get(originalError, 'type')
                        ? lodash_1.default.get(originalError, 'type')
                        : this.code;
            this.description =
                lodash_1.default.get(originalError, 'response.data.description')
                    ? lodash_1.default.get(originalError, 'response.data.description')
                    : this.description;
        }
        this.originalError = originalError;
    }
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            description: this.description,
            message: this.message,
            connector: this.connector.toJSON(),
            originalError: {
                name: this.originalError instanceof Error ? {
                    name: this.originalError.name,
                    message: this.originalError.message
                } : this.originalError instanceof axios_1.AxiosError ? {
                    code: this.originalError.code,
                    name: this.originalError.name,
                    status: this.originalError.status,
                    response: this.originalError.response?.data
                } : this.originalError
            }
        };
    }
}
exports.VAPIConnectorError = VAPIConnectorError;
//# sourceMappingURL=connector.errors.js.map