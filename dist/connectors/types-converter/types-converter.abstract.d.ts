export declare class VAPITypesConverter {
    private convertingFunction;
    constructor();
    set(type: string, converter: (value: any) => Promise<any>): VAPITypesConverter;
    convert(type: string, value: any): Promise<any>;
}
