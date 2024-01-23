import { IVAPILogger } from "./logger.types";
export declare class VAPILogger implements IVAPILogger {
    name: string;
    constructor(name: string);
    asyncLog(severity: "error" | "info" | "warning", error: any): void;
    syncLog(severity: "error" | "info" | "warning", data: any): Promise<void>;
}
