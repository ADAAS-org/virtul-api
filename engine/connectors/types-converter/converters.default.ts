export const StringConverter = {
    type: 'string',
    converter: async (value: any) => {
        if (typeof (value) === 'object')
            return JSON.stringify(value)
        else
            return String(value)
    }
};


export const NumberConverter = {
    type: 'number',
    converter: async (value: any) => {
        return Number(value)
    }
};


export const BooleanConverter = {
    type: 'boolean',
    converter: async (value: any) => {
        return !!(value)
    }
};

export const ArrayConverter = {
    type: 'array',
    converter: async (value: any) => {

        switch (typeof value) {
            case 'string':
                try {
                    return JSON.parse(value);
                } catch (error) {
                    return value
                }

            default:
                return value
        }
    }
};

export const JSONConverter = {
    type: 'json',
    converter: async (value: any) => {

        switch (typeof value) {
            case 'string':
                try {
                    return JSON.parse(value);
                } catch (error) {
                    return value
                }

            default:
                return value
        }
    }
};

