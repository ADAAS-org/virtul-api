import { VAPITaskMemory } from "../../memory/memory.abstract";
import { Dictionary } from "../../shared/types";
import { VAPIConnectorParamsMappingObject } from "../connector.types";
export declare class VAPIConnectorsParamsHelper {
    static fillInByMarkup(markup: string, connectorParameters: Map<any, any>, memory: VAPITaskMemory, mapping?: VAPIConnectorParamsMappingObject[]): Promise<Dictionary<string>>;
}
