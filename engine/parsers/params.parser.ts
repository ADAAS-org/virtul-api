
import { JSDOM } from 'jsdom';
import { ParamIterable, ParamsIterator } from './params.iterator';



export class ParamsParser {


    constructor() {

    }


    extract(text: string, customConfig?: any): ParamsIterator {
        const dom = new JSDOM(text);
        const document = dom.window.document;
        const spans = Array.from(document.querySelectorAll('span'));

        return new ParamsIterator(spans);

    }



    getJSON(value: string = ''): { parsed: any, replacement: { key: number, span: ParamIterable }[] } {
        let parsingString = value;

        // TODO FIX when time is come

        const used = [] as any[];

        const dom = new JSDOM(value);
        const document = dom.window.document;
        const spans = document.querySelectorAll(
            "span.request-param-hider"
        );
        let i = 0;

        spans.forEach((span) => {
            const randKey = Math.random();

            used.push({
                key: randKey,
                span: new ParamIterable(span, i),
            });

            i++;
            parsingString = parsingString.replace(
                span.outerHTML,
                randKey as any
                // JSON.stringify(span.getAttribute("id")).replace(/"/gi, '\\"')
            );
        });

        // Add double quotes to property names
        const jsonString = parsingString.replace(
            /([{,]\s*)(\w+)(\s*:)/g,
            '$1"$2"$3'
        );

        // Replace single quotes with double quotes for string values
        const jsonLikeString = jsonString.replace(
            /'([^']+)'(:\s*[^',}\]]+)/g,
            '"$1"$2'
        );

        const parsed = JSON.parse(jsonLikeString);

        return {
            parsed,
            replacement: used
        }
    }


    // GET PATH TO TARGET VALUE
    getPropertyPath(obj, targetValue, currentPath = ''): string | null {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (String(obj[prop]) === String(targetValue)) {
                    return currentPath + prop;
                } else if (typeof obj[prop] === 'object') {
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