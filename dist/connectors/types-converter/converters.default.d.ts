export declare const StringConverter: {
    type: string;
    converter: (value: any) => Promise<string>;
};
export declare const NumberConverter: {
    type: string;
    converter: (value: any) => Promise<number>;
};
export declare const BooleanConverter: {
    type: string;
    converter: (value: any) => Promise<boolean>;
};
export declare const ArrayConverter: {
    type: string;
    converter: (value: any) => Promise<any>;
};
export declare const JSONConverter: {
    type: string;
    converter: (value: any) => Promise<any>;
};
