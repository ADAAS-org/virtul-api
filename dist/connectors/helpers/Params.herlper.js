"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPIConnectorsParamsHelper = void 0;
const params_parser_1 = require("../../parsers/params.parser");
class VAPIConnectorsParamsHelper {
    static async fillInByMarkup(markup, connectorParameters, memory, mapping) {
        let out = markup;
        console.log('fillParams: START');
        const parser = new params_parser_1.ParamsParser().extract(markup);
        for (const variable of parser) {
            // get basic parameters
            const parameterDefinition = connectorParameters.get(variable.referenceId);
            if (parameterDefinition) {
                console.log('parameterDefinition.id: ', parameterDefinition.id);
                // let's check does parameter presented in the mapping.
                const source = mapping && mapping.length ? mapping.find(mp => mp.target.id === parameterDefinition.id)?.source : undefined;
                const requestValue = await memory.get(source ? source : parameterDefinition);
                console.log('requestValue: ', requestValue);
                out = out.replace(variable.replacement, requestValue
                    ? typeof requestValue === 'string' ? requestValue.replace(/\n/ig, '\\n').replace(/\"/ig, '\\"') :
                        requestValue
                    : parameterDefinition.value);
            }
        }
        console.log('out: ', out);
        return out ? JSON.parse(out) : {};
    }
    static async fillInByMarkupString(markup, connectorParameters, memory, mapping) {
        let out = markup;
        console.log('fillParams: START');
        const parser = new params_parser_1.ParamsParser().extract(markup);
        for (const variable of parser) {
            // get basic parameters
            const parameterDefinition = connectorParameters.get(variable.referenceId);
            if (parameterDefinition) {
                console.log('parameterDefinition.id: ', parameterDefinition.id);
                // let's check does parameter presented in the mapping.
                const source = mapping && mapping.length ? mapping.find(mp => mp.target.id === parameterDefinition.id)?.source : undefined;
                const requestValue = await memory.get(source ? source : parameterDefinition);
                console.log('requestValue: ', requestValue);
                out = out.replace(variable.replacement, requestValue
                    ? typeof requestValue === 'string' ? requestValue.replace(/\n/ig, '\\n').replace(/\"/ig, '\\"') :
                        requestValue
                    : parameterDefinition.value);
            }
        }
        console.log('out: ', out);
        return this.cleanUpHtml(out);
    }
    static cleanUpHtml(input) {
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
exports.VAPIConnectorsParamsHelper = VAPIConnectorsParamsHelper;
//# sourceMappingURL=Params.herlper.js.map