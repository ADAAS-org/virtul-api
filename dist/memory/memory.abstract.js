"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VAPITaskMemory = void 0;
const uuid_1 = require("uuid");
class VAPITaskMemory {
    // memory identifier 
    id = (0, uuid_1.v4)();
    memory = new Map();
    constructor(serialized) {
        if (serialized)
            this.fromJSON(serialized);
    }
    async add(param, value) {
        this.memory.set(param.id, value);
    }
    async get(param) {
        return this.memory.get(param.id);
    }
    async remove(param) {
        this.memory.delete(param.id);
    }
    async destroy() {
        this.memory.clear();
    }
    toJSON() {
        return {
            id: this.id,
            memory: JSON.stringify(Array.from(this.memory.entries()))
        };
    }
    fromJSON(serialized) {
    }
}
exports.VAPITaskMemory = VAPITaskMemory;
//# sourceMappingURL=memory.abstract.js.map