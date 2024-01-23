import { ParamIterable, ParamsIterator } from './params.iterator';
export declare class ParamsParser {
    constructor();
    extract(text: string, customConfig?: any): ParamsIterator;
    getJSON(value?: string): {
        parsed: any;
        replacement: {
            key: number;
            span: ParamIterable;
        }[];
    };
    getPropertyPath(obj: any, targetValue: any, currentPath?: string): string | null;
}
