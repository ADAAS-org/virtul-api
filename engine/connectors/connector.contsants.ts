import { IVAPIErrorParams } from "../error/error.types";

export const DEFAULT_CONNECTOR_ERRORS = {
    METHOD_NOT_IMPLEMENTED: {
        name: 'METHOD_NOT_IMPLEMENTED',
        code: 'VAPI-CONNECTOR-ERR-0000',
        message: 'Called method is not implemented',
        description: 'Please make sure that the method you\'re calling is implemented',
    } as IVAPIErrorParams,
    TARGET_CONNECTOR_NOT_FOUND: {
        name: 'TARGET_CONNECTOR_NOT_FOUND',
        code: 'VAPI-CONNECTOR-ERR-0001',
        message: 'Unable to find and initialize target connector',
        description: 'Please make sure that parameters passed correctly or contact support',
    } as IVAPIErrorParams,
    REMOTE_API_ERROR: {
        name: 'REMOTE_API_ERROR',
        code: 'VAPI-CONNECTOR-ERR-0002',
        message: 'Remote API returned error',
        description: 'Please make sure that parameters passed correctly or contact support',
    } as IVAPIErrorParams
}