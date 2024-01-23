"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsParser = void 0;
const jsdom_1 = require("jsdom");
const params_iterator_1 = require("./params.iterator");
class ParamsParser {
    constructor() {
    }
    extract(text, customConfig) {
        const dom = new jsdom_1.JSDOM(text);
        const document = dom.window.document;
        const spans = Array.from(document.querySelectorAll('span'));
        return new params_iterator_1.ParamsIterator(spans);
    }
    getJSON(value = '') {
        let parsingString = value;
        // TODO FIX when time is come
        const used = [];
        const dom = new jsdom_1.JSDOM(value);
        const document = dom.window.document;
        const spans = document.querySelectorAll("span.request-param-hider");
        let i = 0;
        spans.forEach((span) => {
            const randKey = Math.random();
            used.push({
                key: randKey,
                span: new params_iterator_1.ParamIterable(span, i),
            });
            i++;
            parsingString = parsingString.replace(span.outerHTML, randKey
            // JSON.stringify(span.getAttribute("id")).replace(/"/gi, '\\"')
            );
        });
        // Add double quotes to property names
        const jsonString = parsingString.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
        // Replace single quotes with double quotes for string values
        const jsonLikeString = jsonString.replace(/'([^']+)'(:\s*[^',}\]]+)/g, '"$1"$2');
        const parsed = JSON.parse(jsonLikeString);
        return {
            parsed,
            replacement: used
        };
    }
    // GET PATH TO TARGET VALUE
    getPropertyPath(obj, targetValue, currentPath = '') {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (String(obj[prop]) === String(targetValue)) {
                    return currentPath + prop;
                }
                else if (typeof obj[prop] === 'object') {
                    let nestedPath = this.getPropertyPath(obj[prop], targetValue, currentPath + prop + '.');
                    if (nestedPath) {
                        return nestedPath;
                    }
                }
            }
        }
        return null;
    }
}
exports.ParamsParser = ParamsParser;
//# sourceMappingURL=params.parser.js.map