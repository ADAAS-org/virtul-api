import { VAPITaskMemory } from "../../memory/memory.abstract";
import { ParamsParser } from "../../parsers/params.parser";
import { Dictionary } from "../../shared/types";
import { VAPIConnectorParamsMappingObject } from "../connector.types";

export class VAPIConnectorsParamsHelper {


    static async fillInByMarkup(
        markup: string,
        connectorParameters: Map<any, any>,
        memory: VAPITaskMemory,
        mapping?: VAPIConnectorParamsMappingObject[]
    ): Promise<Dictionary<string>> {
        let out = markup

        console.log('fillParams: START')

        const parser = new ParamsParser().extract(markup)

        for (const variable of parser) {

            // get basic parameters
            const parameterDefinition = connectorParameters.get(variable.referenceId);

            if (parameterDefinition) {
                console.log('parameterDefinition.id: ', parameterDefinition.id)
                // let's check does parameter presented in the mapping.

                const source = mapping && mapping.length ? mapping.find(mp => mp.target.id === parameterDefinition.id)?.source : undefined

                const requestValue = await memory.get(source ? source : parameterDefinition);

                console.log('requestValue: ', requestValue)

                out = out.replace(variable.replacement,
                    requestValue
                        ? typeof requestValue === 'string' ? requestValue.replace(/\n/ig, '\\n').replace(/\"/ig, '\\"') :
                            requestValue
                        : parameterDefinition.value
                )
            }
        }

        console.log('out: ', out);

        return out ? JSON.parse(out) : {};
    }

    static async fillInByMarkupString(
        markup: string,
        connectorParameters: Map<any, any>,
        memory: VAPITaskMemory,
        mapping?: VAPIConnectorParamsMappingObject[]
    ): Promise<string> {
        let out = markup

        console.log('fillParams: START')

        const parser = new ParamsParser().extract(markup)

        for (const variable of parser) {

            // get basic parameters
            const parameterDefinition = connectorParameters.get(variable.referenceId);

            if (parameterDefinition) {
                console.log('parameterDefinition.id: ', parameterDefinition.id)
                // let's check does parameter presented in the mapping.

                const source = mapping && mapping.length ? mapping.find(mp => mp.target.id === parameterDefinition.id)?.source : undefined

                const requestValue = await memory.get(source ? source : parameterDefinition);

                console.log('requestValue: ', requestValue)

                out = out.replace(variable.replacement,
                    requestValue
                        ? typeof requestValue === 'string' ? requestValue.replace(/\n/ig, '\\n').replace(/\"/ig, '\\"') :
                            requestValue
                        : parameterDefinition.value
                )
            }
        }

        console.log('out: ', out);

        return this.cleanUpHtml(out);
    }

    


    static cleanUpHtml(input: string): string {
        // Remove HTML tags
        const withoutHtmlTags = input.replace(/<[^>]*>/g, '');

        // Remove inline styles
        const withoutStyles = withoutHtmlTags.replace(/style\s*=\s*"[^"]*"/g, '');

        // Remove scripts
        const withoutScripts = withoutStyles.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

        // Remove non-breaking spaces
        const withoutNbsp = withoutScripts.replace(/&nbsp;/g, ' ');

        // Trim extra whitespace
        const trimmed = withoutNbsp.trim();

        return trimmed;
    }

}