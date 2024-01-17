export class VAPITypesConverter {


    private convertingFunction: Map<string, (value: any) => Promise<any>> = new Map()

    constructor() {

    }



    set(type: string, converter: (value: any) => Promise<any>): VAPITypesConverter {
        this.convertingFunction.set(type, converter);
        return this;
    }


    async convert(type: string, value: any) {
        const targetConverter = this.convertingFunction.get(type);
        if (targetConverter)
            return await targetConverter(value);
        else
            return value;
    }
}