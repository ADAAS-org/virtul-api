"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIConnectorsManager = void 0;
const error_abstract_1 = require("../error/error.abstract");
const connector_contsants_1 = require("./connector.contsants");
class VAPIConnectorsManager {
    connectors = new Map();
    async getConnector(params) {
        let target = this.connectors.get(JSON.stringify(params));
        if (!target) {
            // try to import connector
            const newConnector = await this.import(params);
            this.connectors.set(JSON.stringify(params), newConnector);
            target = newConnector;
        }
        // throw new CustomError(DEFAULT_CONNECTOR_MANAGER_ERRORS.TARGET_CONNECTOR_NOT_FOUND)
        return target;
    }
    async getNewConnector(params) {
        return this.import(params);
    }
    async import(params) {
        params;
        throw new Error('Method Not Implemented');
    }
    async download() {
        throw new error_abstract_1.VAPIError(connector_contsants_1.DEFAULT_CONNECTOR_ERRORS.METHOD_NOT_IMPLEMENTED);
    }
}
exports.VAPIConnectorsManager = VAPIConnectorsManager;
//# sourceMappingURL=connector.manager.js.map